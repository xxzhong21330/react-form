import React from 'react';
import {FormRef, MealFormField} from "./select-meal-form.common";
import style from './select-meal-form.module.scss';
import {Dish} from "./step-component3";

export default function StepComponent4(
  props: {
    formRef: FormRef;
  },
) {
  const {formRef} = props;
  const formValue = formRef.current.value as { [s in MealFormField]: string | Dish[] };

  return (
    <div className={style.reviewContainer}>
      <div className={style.reviewColumn}>
        <div>Meal:</div>
        <div>{formValue[MealFormField.meal]}</div>
      </div>
      <div className={style.reviewColumn}>
        <div>No. of People:</div>
        <div>{formValue[MealFormField.peopleNum]}</div>
      </div>
      <div className={style.reviewColumn}>
        <div>Restaurant:</div>
        <div>{formValue[MealFormField.restaurant]}</div>
      </div>
      <div className={style.reviewColumn}>
        <div>Dishes:</div>
        <div>
          {(
            (formValue[MealFormField.dishList] as Dish[]).map((d, i) => (
              <div key={i}>{d.dish} - {d.num} </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
