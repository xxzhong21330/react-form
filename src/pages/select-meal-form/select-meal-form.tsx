import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import style from './select-meal-form.module.scss'
import MutiStepTab, {StepTabPanel} from "../../share/muti-step-tab/muti-step-tab";
import axios from "axios";
import {catchError, from, map, of} from "rxjs";
import {MealFormField, Meal, customControlValidate, CustomSubFormValidator, FormRef} from "./select-meal-form.common";
import StepComponent1 from "./step-component1";
import {Button} from "@mui/material";
import {NgFormArray, NgFormControl, NgFormGroup, NgValidators} from "../../share/form";
import {clone} from "lodash-es";
import StepComponent2 from "./step-component2";
import StepComponent3, {createDish} from "./step-component3";
import StepComponent4 from "./step-component4";

//  创建初始表单
function createForm(): NgFormGroup {
  return new NgFormGroup({
    [MealFormField.meal]: new NgFormControl('', [NgValidators.require]),
    [MealFormField.peopleNum]: new NgFormControl('1', [
      NgValidators.min(1), NgValidators.max(10)
    ]),
    [MealFormField.restaurant]: new NgFormControl('', [NgValidators.require]),
    [MealFormField.dishList]: new NgFormArray([createDish()]),
  })
}


//  由于实现过程中发现需要获取子组件相关状态，故封装此类提供访问子组件状态的方法
//  此类需要自定义hook： useComponentWrap 进行实例化
class ComponentWrap {
  private _reactNode: ReactNode | null = null;
  private _customValidator: CustomSubFormValidator | null;

  constructor(
    rn: ReactNode,
    customValidator: CustomSubFormValidator | null = null,
  ) {
    this._reactNode = rn;
    this._customValidator = customValidator;
  }

  getNode(): ReactNode | null {
    return this._reactNode
  }


  //  调用子组件中的验证方法，返回值验证结果
  updateValidity(form: NgFormGroup): boolean {
    if (this._customValidator) {
      return this._customValidator(form);
    }
    return true;
  }

}

//  由于实现过程中发现需要获取子组件相关状态，故封装此 hook 提供访问子组件状态的方法
function useComponentWrap(
  cmp: FunctionComponent<any>,
  props: any,
  customValidator?: CustomSubFormValidator
) {
  const reactNode = React.createElement(cmp, {
    ...props,
  });
  return new ComponentWrap(reactNode, customValidator)
}

//  子表单的自定义验证方法
function customSubFormValidator1(form: NgFormGroup): boolean {
  return customControlValidate(
    form,
    [MealFormField.meal, MealFormField.peopleNum]
  );
}

function customSubFormValidator2(form: NgFormGroup): boolean {
  return customControlValidate(
    form,
    [MealFormField.restaurant]
  );
}

function customSubFormValidator3(form: NgFormGroup): boolean {
  return customControlValidate(
    form,
    [MealFormField.dishList]
  );
}


export default function SelectMealForm() {

  const [mealData, setMealData] = useState<Meal[]>([]);

  //  最终的表单数据
  //  使用 formRef 而不是直接使用 form 的原因在于触发 render 需要 clone 改变对象引用
  //  直接克隆 formGroup 会导致表单中的子项对父级的引用丢失
  const [formRef, setFormRef] = useState<FormRef>({current: createForm()});


  // 当前子组件选中的 tabIndex
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  //  初始化查询数据
  useEffect(() => {
    from(axios.get('/dishes.json')).pipe(
      map((res: any) => res?.data?.dishes || []),
      catchError(err => {
        console.error('请求异常');
        return of([]);
      })
    ).subscribe((res: Meal[]) => {
      setMealData(res);
    });
  }, [])


  //  表单项输入处理
  const handleFormChange = (key: MealFormField, value: any): void => {
    //  克隆一个新的 form
    const newFormRef = clone(formRef);
    const newForm = newFormRef.current;

    switch (key) {
      case MealFormField.peopleNum:
        //  小于 0 不能设置值
        if (value < 0) {
          break;
        }
        newForm.get(key).setValue(value);
        break;
      case MealFormField.dishList:
        //  第三个表单项跳过赋值（FormArray 较为特殊），已经在组件3中完成修改；
        break;
      default:
        newForm.get(key).setValue(value);
    }

    setFormRef(newFormRef);
  }

  const tabBars: ReactNode[] = [
    <div key={'step1'}>step1</div>,
    <div key={'step2'}>step2</div>,
    <div key={'step3'}>step3</div>,
    <div key={'step4'}>review</div>,
  ];

  //  四个子组件，每个组件代表填写的每一步
  const componentWrap1 = useComponentWrap(
    StepComponent1,
    {
      key: 'StepComponent1',
      mealData,
      formRef,
      handleFormChange,
    },
    customSubFormValidator1,
  );

  const componentWrap2 = useComponentWrap(
    StepComponent2,
    {
      key: 'StepComponent2',
      mealData,
      formRef,
      handleFormChange,
    },
    customSubFormValidator2,
  );

  const componentWrap3 = useComponentWrap(
    StepComponent3,
    {
      key: 'StepComponent3',
      mealData,
      formRef,
      handleFormChange,
    },
    customSubFormValidator3,
  );

  const componentWrap4 = useComponentWrap(
    StepComponent4,
    {
      key: 'StepComponent4',
      formRef,
    }
  );

  const tabPanels: StepTabPanel[] = [
    componentWrap1.getNode(),
    componentWrap2.getNode(),
    componentWrap3.getNode(),
    componentWrap4.getNode(),
  ];

  //  储存各组件的 componentWrap 状态
  const componentWrapList = [
    componentWrap1,
    componentWrap2,
    componentWrap3,
    componentWrap4,
  ];

  // 执行当前子组件内的表单验证，返回值为验证后表单的 isvalid 状态
  const validateSubForm = (index?: number) => {
    const targetIndex = index == null ? currentStepIndex : index;
    const targetComponentWrap = componentWrapList[targetIndex];
    return targetComponentWrap.updateValidity(formRef.current);
  }


  // 点击下一步
  const multiStepNextHandleRef = useRef<any>(null);
  //  下一步
  const handleNextStep = () => {
    const isValid = validateSubForm();

    if (isValid) {
      //  调用子组件中的 next 方法
      if (multiStepNextHandleRef.current == null) {
        console.error('mutiStepTab组件为暴露对应的 next 引用');
      }
      multiStepNextHandleRef.current?.next();
    } else {
      setFormRef({current: formRef.current})
    }
  }

  //  上一步
  const handlePreviousStep = () => {
    //  调用子组件中的 previous 方法
    if (multiStepNextHandleRef.current == null) {
      console.error('mutiStepTab组件为暴露对应的 next 引用');
    }
    multiStepNextHandleRef.current?.previous();
  }

  //  使用 useCallback 优化渲染
  const handleTabChange = useCallback((index: number) => {
    setCurrentStepIndex(index);
  }, []);

  //  判断是否允许切换 tab
  const canSwitchTab = (index: number) => {
    if (index < currentStepIndex) {
      return true;
    }

    //  向前切换 tab 只能下一页，不允许跳过中间的表单直接切换（这会导致验证非常困难）
    if (index > currentStepIndex + 1) {
      return false;
    }
    //  验证当前页是否合法
    let isValid = validateSubForm(currentStepIndex);
    setFormRef(clone(formRef));

    return isValid;
  }

  const handleSubmit = () => {
    // todo: 提交表单
    console.log('提交表单', formRef.current.value)
  }


  //  渲染动作按钮
  const renderActionBtn = () => {
    if (currentStepIndex === tabPanels.length - 1) {
      return (
        <Button className={style.actionBtn}
                variant="contained" fullWidth
                onClick={handleSubmit}
        >
          Submit
        </Button>
      );
    }

    if (currentStepIndex === 0) {
      return (
        <Button className={style.actionBtn}
                variant="contained" fullWidth
                onClick={handleNextStep}
        >
          Next
        </Button>
      );
    }

    //  同时显示上一页和下一页
    return (
      <div className={style.previousAndNextWrap}>
        <Button variant="contained"
                color={'secondary'}
                onClick={handlePreviousStep}
        >
          Previous
        </Button>
        <Button variant="contained"
                onClick={handleNextStep}
        >
          Next
        </Button>
      </div>
    );

  }

  return (
    <div className={style.selectMealFormContainer}>
      <MutiStepTab tabBars={tabBars}
                   tabPanels={tabPanels}
                   nextHandleRef={multiStepNextHandleRef}
                   canSwitchTab={canSwitchTab}
                   onTabChange={handleTabChange}
      />

      {/* 动作按钮 */}
      {renderActionBtn()}
    </div>
  );
}
