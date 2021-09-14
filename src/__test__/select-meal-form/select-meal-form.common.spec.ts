import {NgFormControl, NgFormGroup, NgValidators} from "../../share/form";
import {customControlValidate} from "../../pages/select-meal-form/select-meal-form.common";

describe('customControlValidate', () => {
  it('customControlValidate 验证 formGroup 中指定字段的是否合法', function () {
    const fg = new NgFormGroup({
      valid1: new NgFormControl(0),
      invalid1: new NgFormControl('', [NgValidators.require]),
    });
    //  当前整个表单验证不通过
    fg.updateState()
    expect(fg.isValid).toEqual(false);
    expect(customControlValidate(fg, ['valid1'])).toEqual(true);
  });

})
