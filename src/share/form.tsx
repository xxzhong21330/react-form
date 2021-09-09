
interface ValidatorError {
  [s: string]: boolean;
}

//  返回 null 说明验证通过
export  type FormValidator = (control: AbstractControl) => ValidatorError | null;

export class NgValidators {
  static require(control: AbstractControl): ValidatorError | null {
    const value = control.value;
    return value == null || value.length === 0 ? {require: true} : null;
  }

  static min(num: number): FormValidator {
    return (control: AbstractControl) => {
      const value = control.value;
      return value < num ? {min: true} : null;
    }
  }

  static max(num: number): FormValidator {
    return (control: AbstractControl) => {
      const value = control.value;
      return value > num ? {max: true} : null;
    }
  }
}


interface UpdateStateOption {
  onlySelf?: boolean;
}

//  由于 react 生态中暂未找到较合适的表单工具
//  简易实现 angular 表单
export abstract class AbstractControl {
  protected _parent: AbstractControl | null = null;

  protected _validators: FormValidator[] = [];

  protected _value: any;
  get value(): any {
    return this._value;
  };

  protected _errors: ValidatorError | null = null;

  get error() {
    return this._errors;
  }

  protected _isValid = true;
  get isValid() {
    return this._isValid;
  }

  constructor(value: any, validators: FormValidator[]) {
    this._value = value;
    this._validators = validators
  }

  // 设置表单值
  setValue(value: any, option?: { onlySelf: boolean }): void {
    this._value = value;
    this.updateState(option);

    this._synchronizeParentValue();
  }

  setParent(parent: AbstractControl): void {
    this._parent = parent;
  }


  /**
   * 检查当前表单项的状态
   * 注意：仅运行当前所在的 AbstractControl 校验器（并不触发子项的校验器）
   * @param option
   *            onlySelf: 仅在当前control运行校验，不通知父级 (默认 false)
   *
   */
  updateState(option?: UpdateStateOption): void {

    let childAllValid = true;
    //  如果为 formGroup、formArray，需要递归向下检查并同步子项状态
    if ((this instanceof NgFormGroup || this instanceof NgFormArray)) {
      this._forEachChild((c) => {
        childAllValid = childAllValid && c.isValid;
      });
    }

    this._isValid = childAllValid
      ? AbstractControl.executeCurrentValidators(this)
      : false;

    //  如果设置 onlySelf 为 true, 不触发父级更新
    if (option?.onlySelf !== true) {
      this._parent?.updateState();
    }

  }


  removeValidator() {
    this._validators = [];
  }

  addValidators(validatorList: FormValidator[]) {
    this._validators = this._validators.concat(validatorList);
  }

  //  同步value
  protected _synchronizeParentValue() {
    let parent = this._parent;
    while (parent != null) {
      if (parent instanceof NgFormGroup || parent instanceof NgFormArray) {
        parent._refreshValue();
      }
      parent = parent._parent;
    }
  }

  //  在当前表单项执行校验
  //  针对 formGroup 和 FormArray，还需要校验子项
  static executeCurrentValidators(control: AbstractControl): boolean {
    //  验证当前所在的验证器
    for (let fn of control._validators) {
      const err = fn(control);

      if (err != null) {
        control._errors = err;
        control._isValid = false;
        return false;
      }
    }

    //  如果为 formGroup 和 FormArray 还需要递归校验子项验证器
    let childrenIsValid = true;
    if (control instanceof NgFormGroup || control instanceof NgFormArray) {
      control._forEachChild((c) => {
        childrenIsValid = childrenIsValid && AbstractControl.executeCurrentValidators(c);
      });
    }

    //  校验全部通过
    if (childrenIsValid) {
      control._errors = null;
      control._isValid = true;

      return true;
    } else {
      //  这里不能为 _errors 属性赋值，因为 _errors 只显示当前所在验证器的错误
      control._isValid = false;
      return false;
    }
  }

}

//  FormControl
export class NgFormControl extends AbstractControl {
  constructor(value: any, validators: FormValidator[] = []) {
    super(value, validators)
  }

}


//  FormGroup
export class NgFormGroup<T = any> extends AbstractControl {
  controls: Record<keyof T, AbstractControl> = {} as any;

  constructor(controlMap: Record<keyof T, AbstractControl>, validators: FormValidator[] = []) {
    super(NgFormGroup.parseValueFormControls(controlMap), validators);
    this.controls = controlMap;

    //   调用每个子项的 setParent 方法设置 parent
    this._forEachChild(d => d.setParent(this));
  }

  // 设置表单值
  setValue(
    controlMap: Record<keyof T, AbstractControl>,
    option?: { onlySelf: boolean }
  ): void {
    this._value = NgFormGroup.parseValueFormControls(controlMap);
    this.controls = controlMap;
    this._forEachChild(d => d.setParent(this));

    this.updateState(option);
    this._synchronizeParentValue();
  }

  //  获取指定的 formControl
  get(key: keyof T): AbstractControl {
    const ctl = this.controls[key];
    if (ctl == null) {
      console.error('formGroup 中没有对应的表单项');
    }
    return ctl;
  }

  //  实现遍历子项的方法
  _forEachChild(callBack: (control: AbstractControl) => void): void {
    Object.values<AbstractControl>(this.controls).forEach((d) => callBack(d));
  };

  _refreshValue() {
    this._value = NgFormGroup.parseValueFormControls(this.controls);
  }

  private static parseValueFormControls(
    formMap: Record<string, AbstractControl>
  ): Record<string, any> {
    if (Object.prototype.toString.call(formMap) !== '[object Object]') {
      console.error('ngFormGroup 只支持对象参数')
      return {};
    }

    return Object.entries(formMap).reduce(
      (acc, [key, control]) => {
        acc[key] = control.value;
        return acc;
      }, {} as Record<string, any>)
  }
}


//  FormArray
export class NgFormArray<T extends AbstractControl = any> extends AbstractControl {
  controls: Array<T> = [];

  constructor(controlList: T[], validators: FormValidator[] = []) {
    super(NgFormArray.parseValueFormControls(controlList), validators);

    this.controls = controlList;

    //  设置子项的 _parent属性
    this._forEachChild(d => d.setParent(this));
  }

  // 设置表单值
  setValue(
    controlList: T[],
    option?: { onlySelf: boolean }
  ): void {
    this._value = NgFormArray.parseValueFormControls(controlList);
    this.controls = controlList;
    this._forEachChild(d => d.setParent(this));

    this.updateState(option);
    this._synchronizeParentValue();
  }

  //  实现遍历子项的方法
  _forEachChild(callBack: (control: AbstractControl) => void): void {
    this.controls.forEach(d => callBack(d));
  };

  _refreshValue() {
    this._value = NgFormArray.parseValueFormControls(this.controls);
  }

  addControl(item: T) {
    this.controls.push(item);
    item.setParent(this);
    this._value = NgFormArray.parseValueFormControls(this.controls);
  }

  removeControl(index: number) {
    this.controls.splice(index, 1);
    this._value = NgFormArray.parseValueFormControls(this.controls);
  }

  //  解析 AbstractControl 列表，获取对应的 value
  private static parseValueFormControls(controlList: AbstractControl[]): any[] {
    return controlList.map(d => d.value);
  }
}
