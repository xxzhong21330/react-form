import React from 'react';
import {FormRef, Meal, MealFormField} from "./select-meal-form.common";
import {NgFormGroup} from "../../share/form";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {unionListField} from "../../share/utils";


// 从数据中过滤出 restaurant 数据
function getRestaurantList(mealData: Meal[], form: NgFormGroup): string[] {
  const selectedMeal = form.get(MealFormField.meal).value;
  const availableList = mealData.filter(d => d.availableMeals.includes(selectedMeal));
  return unionListField(availableList, 'restaurant') as string[];
}

export default function StepComponent2(
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

  const handleRestaurantChange = (event: SelectChangeEvent) => {
    handleFormChange(MealFormField.restaurant, event.target.value);
  }


  const renderSelectBox = () => {
    const restaurantList = getRestaurantList(mealData, form);
    const selctedRestaurant = form.get(MealFormField.restaurant).value;

    if (!restaurantList.includes(selctedRestaurant)){
      form.get(MealFormField.restaurant).setValue('');
    }

    return (
      <Select
        labelId="select-meal-label"
        id="select-meal"
        value={form.get(MealFormField.restaurant).value}
        onChange={handleRestaurantChange}
      >
        {(
          restaurantList.map((d, index) =>
            <MenuItem key={'key' + index} value={d}>{d}</MenuItem>)
        )}
      </Select>
    )
  }

  return (
    <div>
      <InputLabel style={{textAlign: 'left'}}>
        Please Select a Restaurant:
      </InputLabel>
      <FormControl fullWidth error={!form.get(MealFormField.restaurant).isValid}>
        {/* 渲染选择框 */}
        {renderSelectBox()}


        {/* 渲染提示信息 */}
        {(
          form.get(MealFormField.restaurant).error?.require
            ? <FormHelperText>Must Select Restaurant</FormHelperText>
            : null
        )}

      </FormControl>
    </div>
  );
}
