import React from "react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {unionListField} from "../../share/utils";
import {FormRef, Meal, MealFormField} from "./select-meal-form.common";


function getMealList(mealData: Meal[]): string[] {
  return unionListField(mealData, 'availableMeals') as string[];
}

export default function StepComponent1(
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

  //  选中 meal
  const handleMealChange = (event: SelectChangeEvent) => {
    handleFormChange(MealFormField.meal, event.target.value);
  };

  //  人数变化
  const handlePeopleNumChange = (event: any) => {
    handleFormChange(MealFormField.peopleNum, event.target.value);
  };

  return (
    <div>
      <InputLabel style={{textAlign: 'left'}}>
        Please Select a meal:
      </InputLabel>
      <FormControl fullWidth error={!form.get(MealFormField.meal).isValid}>
        <Select
          labelId="select-meal-label"
          id="select-meal"
          value={form.get(MealFormField.meal).value}
          onChange={handleMealChange}
        >
          {(
            getMealList(mealData).map((d, index) =>
              <MenuItem key={'key' + index} value={d}>{d}</MenuItem>)
          )}
        </Select>
        {(
          form.get(MealFormField.meal).error?.require
            ? <FormHelperText>Must Select Meal</FormHelperText>
            : null
        )}
      </FormControl>


      {/* 输入人数 */}
      <InputLabel style={{textAlign: 'left'}}>
        Please Enter Number Of People:
      </InputLabel>
      <TextField
        fullWidth
        id="standard-number"
        type="number"
        value={form.get(MealFormField.peopleNum).value}
        onChange={handlePeopleNumChange}
        error={!form.get(MealFormField.peopleNum).isValid}
      />
      {(
        form.get(MealFormField.peopleNum).error?.min
          ? <FormHelperText className={'Mui-error'}>
            Number must be greater than or equal to 1
          </FormHelperText>
          : null
      )}
      {(
        form.get(MealFormField.peopleNum).error?.max
          ? <FormHelperText className={'Mui-error'}>
            Number must be less than or equal to 10
          </FormHelperText>
          : null
      )}
    </div>
  );
}
