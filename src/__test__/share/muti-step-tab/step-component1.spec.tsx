import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import StepComponent1 from "../../../pages/select-meal-form/step-component1";
import {createForm} from "../../../pages/select-meal-form/select-meal-form";
import {Select, TextField} from "@mui/material";
import React from "react";
import {getAllByRole, getByText} from "@testing-library/react";
import {MealFormField} from "../../../pages/select-meal-form/select-meal-form.common";

//  mock 报 'Nothing was returned from render' 错误, 链接： https://github.com/facebook/jest/issues/10849#issuecomment-740236180
jest.mock('@mui/material', () => ({
  __esModule: true,
  ...jest.requireActual('@mui/material'),
  Select: jest.fn((props) => (
    <div>{props.children}</div>
  )),
  TextField: jest.fn((props) => <div>{props.children}</div>),
}));

let container: HTMLElement = null as any;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
})

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null as any;
})


describe('StepComponent1', () => {
  const mealData = [
    {
      "id": 32,
      "name": "Rigatoni Spaghetti",
      "restaurant": "Olive Garden",
      "availableMeals": ["lunch", "dinner"],
    }
  ];


  it('组件渲染正确', function () {
    const handleFormChange = jest.fn();
    const formRef = {current: createForm()};

    act(() => {
      render(
        <StepComponent1 mealData={mealData}
                        handleFormChange={handleFormChange}
                        formRef={formRef}
        />,
        container,
      )
    });

    // 测试 Select 组件渲染时的 props
    expect(Select).toBeCalledWith(expect.objectContaining({
      value: ''
    }), {});
    //  测试选择项
    const menuItemList = getAllByRole(container, 'menuitem');
    expect(menuItemList.map(d => d.textContent)).toEqual(["lunch", "dinner"])

    //   测试 input 框是否正确
    expect(TextField).toBeCalledWith(expect.objectContaining({
      value: '1'
    }), {});

  });

  it('组件报错提示正确显示', function () {
    const handleFormChange = jest.fn();
    const fg = createForm();
    //  修改表达值
    fg.get(MealFormField.meal).setValue('');
    fg.get(MealFormField.peopleNum).setValue('12');
    fg.updateState();
    const formRef = {current: fg};

    act(() => {
      render(
        <StepComponent1 mealData={mealData}
                        handleFormChange={handleFormChange}
                        formRef={formRef}
        />,
        container,
      )
    });

    getByText(container, 'Must Select Meal');
    getByText(container, 'Number must be less than or equal to 10');
  });

})
