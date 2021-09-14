import {NgFormGroup} from "../../share/form";


export interface Meal {
  availableMeals: string[];
  id: string | number;
  name: string;
  restaurant: string;
}

export enum MealFormField {
  meal = 'meal',
  peopleNum = 'peopleNum',
  restaurant = 'restaurant',
  dishList = 'dishList',
}

export interface FormRef{
  current: NgFormGroup;
}

export type CustomSubFormValidator = (form: NgFormGroup) => boolean;

// 子组件自定义验证指定 formControl
export function customControlValidate(
  form: NgFormGroup,
  keyList: string[],
): boolean {
  const isValid = keyList.reduce(
    (acc, key) => {
      const control = form.get(key);
      //  注意： 此处调用子组件校验，不触发父级状态校验
      control.updateState({onlySelf: false});
      return acc && control.isValid;
    }, true);

  return isValid;
}
