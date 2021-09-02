import {FormRef, Meal, MealFormField} from "./select-meal-form.common";
import {AbstractControl, NgFormArray, NgFormControl, NgFormGroup, NgValidators} from "../../share/form";
import React from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import style from './select-meal-form.module.scss';

export interface Dish {
  dish: string;
  num: number;
}

//  创建一个新的默认 dish 表单项
export function createDish(): NgFormGroup<Dish> {
  return new NgFormGroup({
    dish: new NgFormControl('', [NgValidators.require]),
    num: new NgFormControl('1'),
  })
}

//  自定义验证器
function dishValidator(form: NgFormGroup, control: AbstractControl) {
  const peopleNum = form.get(MealFormField.peopleNum).value;
  let totalNum = 0;
  (control as NgFormArray)._forEachChild((d) => {
    totalNum += +(d as NgFormGroup<Dish>).get('num').value;
  })
  return peopleNum <= totalNum ? null : {lackOfDish: true};
}

export default function StepComponent3(
  props: {
    mealData: Meal[];
    handleFormChange: (key: MealFormField, value: any) => void;
    formRef: FormRef;
  },
) {
  const {
    mealData,
    formRef,
    handleFormChange,
  } = props;
  const form = formRef.current;

  //
  const selectedMeal = form.get(MealFormField.meal).value;
  const selectedRestaurant = form.get(MealFormField.restaurant).value;
  const selectedDishValue = form.get(MealFormField.dishList).value as Dish[];
  //  此组件中的验证器是动态（依赖于前两步的值）,故需要动态添加验证器
  const dishFormArray = form.get(MealFormField.dishList) as NgFormArray<NgFormGroup<Dish>>;
  const totalDishOptionList = mealData.filter(d => (
    d.restaurant === selectedRestaurant
    && d.availableMeals.includes(selectedMeal))
  );

  // dishFormArray.updateState();
  if (dishFormArray.isValid) {
    dishFormArray.removeValidator();
    dishFormArray.addValidators([dishValidator.bind(undefined, form)]);
  }


  //  选择 dish
  function handleSelectChange(index: number, event: SelectChangeEvent) {
    const currentDishControl = dishFormArray.controls[index];
    currentDishControl.get('dish').setValue(event.target.value);
    handleFormChange(MealFormField.dishList, null);
  }

  //  选择人数
  function handleServingChange(index: number, event: SelectChangeEvent) {
    //  不能小于1
    if (+event.target.value < 1) {
      return;
    }
    const currentDishControl = dishFormArray.controls[index];
    currentDishControl.get('num').setValue(event.target.value);
    handleFormChange(MealFormField.dishList, null);
  }


  const renderSelectInput = (item: NgFormGroup<Dish>, i: number) => {
    const prevSelectedDishNameList = selectedDishValue.slice(0, i).map(d => d.dish);

    //  剔除前面选中的表单
    const currentDishOptionList = totalDishOptionList.filter(d => !prevSelectedDishNameList.includes(d.name));

    return (<Select
      labelId={'select-dish-label' + i}
      id={'select-dish' + i}
      value={item.get('dish').value}
      onChange={(e) => {
        handleSelectChange(i, e)
      }}
    >
      {(
        currentDishOptionList.map(d => (
            <MenuItem key={d.name} value={d.name}>{d.name}</MenuItem>
          )
        )
      )}
    </Select>)
  }

  const renderDishList = () => {
    //  检查当前表单值是否合法（由于关联之前的操作，可能由于修改之前的内容造成当前值不合法）
    const totalDishOptionNameList = totalDishOptionList.map(d => d.name);
    //  当前表单所有值都必须在可选范围内
    const isValid = selectedDishValue.every(d => (
      d.dish === '' ? true : totalDishOptionNameList.includes(d.dish)
    ));
    if (!isValid) {
      //  不合法则重置 formArray 的值
      dishFormArray.setValue([createDish()]);
    }

    return dishFormArray.controls
      .map((item, i) => {
        return (
          <div key={i} className={style.threeColumn}>
            <div>
              <FormControl fullWidth
                           error={!item.get('dish').isValid}>
                {/* 渲染 select 选择框 */}
                {renderSelectInput(item, i)}

                {/* 提示信息 */}
                {(
                  item.get('dish').error?.require
                    ? <FormHelperText>Must Select a Dish</FormHelperText>
                    : null
                )}
              </FormControl>
            </div>
            <div>
              <TextField
                fullWidth
                id="standard-number"
                type="number"
                value={item.get('num').value}
                error={!item.get('num').isValid}
                onChange={(e: any) => {
                  handleServingChange(i, e);
                }}
              />
            </div>
            {/* 删除按钮*/}
            {(
              <Button className={style.deleteBtn} size="small"
                      onClick={() => handleDeleteDish(i)}
                      variant="contained"
                      color="secondary"
                      disabled={selectedDishValue.length <= 1}
              >
                Delete
              </Button>
            )}
          </div>
        )
      })
  }

  const addDishHandle = () => {
    //  如果子项没有验证通过，不能添加
    let childrenIsValid = true;
    for (let c of dishFormArray.controls) {
      c.updateState({onlySelf: true});
      childrenIsValid = childrenIsValid && c.isValid;
      if (!childrenIsValid) {
        //  触发更新
        handleFormChange(MealFormField.dishList, null);
        return;
      }
    }

    //  如果没有可选的 dish 不能添加
    if (selectedDishValue.length === totalDishOptionList.length) {
      return;
    }

    //  新增一行
    const newDishControl = createDish();
    //  希望增加新表单项之后能立即看到错误提示
    newDishControl.updateState();
    dishFormArray.addControl(newDishControl);
    //  触发更新
    handleFormChange(MealFormField.dishList, null);
  }

  const handleDeleteDish = (index: number) => {
    //  小于一项不能删除
    if (dishFormArray.controls.length <= 1) {
      return;
    }

    dishFormArray.removeControl(index);
    //  触发更新
    handleFormChange(MealFormField.dishList, null);
  }


  return (
    <div>
      <div className={`${style.threeColumn} ${style.caption}`}>
        <div>Please Select a Dish</div>
        <div>Please Enter Number of Serving</div>
      </div>
      {/* 渲染已选的 Dish 列表 */}
      {renderDishList()}

      <FormHelperText className={'Mui-error'}>
        {(
          dishFormArray.controls.every(d => d.isValid) && dishFormArray.error?.lackOfDish
            ? 'Total dish number must be greater than or equal to people number'
            : ''
        )}
      </FormHelperText>
      {/*  新增按钮  */}
      {(
        selectedDishValue.length === totalDishOptionList.length
          ? null
          : <div className={style.addDishBtnWrap}>
            <Button variant="contained"
                    onClick={addDishHandle}
            >
              add Dish
            </Button>
          </div>
      )}

    </div>
  );
}
