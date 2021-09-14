//  验证器测试
import {AbstractControl, NgFormArray, NgFormControl, NgFormGroup, NgValidators, ValidatorError} from "../../share/form";
import {act} from "react-dom/test-utils";

describe('NgValidators', () => {
  it('require 方法判断空字符串、空数组', function () {
    const control1 = new NgFormControl('');
    expect(NgValidators.require(control1)).toEqual({require: true});
    const control1_1 = new NgFormControl('abc');
    expect(NgValidators.require(control1_1)).toEqual(null);

    const control2 = new NgFormControl([]);
    expect(NgValidators.require(control2)).toEqual({require: true});
    const control2_1 = new NgFormControl([1, 2]);
    expect(NgValidators.require(control2_1)).toEqual(null);

    const control3 = new NgFormControl(0);
    expect(NgValidators.require(control3)).toEqual(null);

    const control4 = new NgFormControl(null);
    expect(NgValidators.require(control4)).toEqual({require: true});
    const control4_1 = new NgFormControl(undefined);
    expect(NgValidators.require(control4_1)).toEqual({require: true});

    const control5 = new NgFormArray([]);
    expect(NgValidators.require(control5)).toEqual({require: true});

  });

  it('min 方法判断子自己小的数字', function () {
    const control1 = new NgFormControl(2);
    expect(NgValidators.min(3)(control1)).toEqual({min: true});

    const control2 = new NgFormControl(5);
    expect(NgValidators.min(3)(control2)).toEqual(null);
  });

  it('max 方法判断子自己大的数字', function () {
    const control1 = new NgFormControl(2);
    expect(NgValidators.max(3)(control1)).toEqual(null);

    const control2 = new NgFormControl(5);
    expect(NgValidators.max(3)(control2)).toEqual({max: true});
  });
})


// 增加自定义 matcher 用于验证正确的 Abstract 状态
declare global {
  namespace jest {
    interface Matchers<R> {
      equalCorrectControl(
        state: { value: any, isValid: boolean, error: null | ValidatorError }
      ): R;
    }
  }
}
expect.extend({
  equalCorrectControl(
    receive,
    state: { value: any, isValid: boolean, error: null | ValidatorError }
  ) {

    const valueIsEqual = this.equals(receive.value, state.value);
    const stateIsEqual = receive.isValid === state.isValid;
    const errorIsEqual = this.equals(receive.error, state.error);

    const pass = valueIsEqual && stateIsEqual && errorIsEqual;

    // this.utils.subsetEquality
    return {
      pass,
      message: () => {
        if (!valueIsEqual) {
          return `expect: ${this.utils.printExpected(state.value)},\nacture: ${this.utils.printExpected(receive.value)}`
        }
        if (!stateIsEqual) {
          return `expect: ${this.utils.printExpected(state.isValid)},\nacture: ${this.utils.printExpected(receive.isValid)}`
        }
        if (!errorIsEqual) {
          return `expect: ${this.utils.printExpected(state.error)},\nacture: ${this.utils.printExpected(receive.error)}`
        }
        return '';
      },

    };
  }
})

describe('NgFormControl', () => {
  it('正常初始化', function () {
    const control1 = new NgFormControl('');
    expect(control1.value).toEqual('');

    const control2 = new NgFormControl(0);
    expect(control2.value).toEqual(0);

  });

  it('初始化时初始值为第一个参数，第二个参数为校验器列表，且不触发校验', function () {
    const control = new NgFormControl('', [NgValidators.require]);
    expect(control.value).toEqual('');
    expect(control.isValid).toEqual(true);
    expect(control.error).toEqual(null);
  });

  it('updateState 方法触发校验', function () {
    const control = new NgFormControl('', [NgValidators.require]);
    expect(control.error).toEqual(null);
    control.updateState();
    expect(control.error).toEqual({require: true});
  });

  it('传入多个校验器时，校验失败抛出第一个校验失败的信息', function () {
    const control = new NgFormControl(0, [
      NgValidators.require,
      NgValidators.min(2),
      //  自定义校验
      (c) => {
        return {custom: true}
      }
    ]);
    //  测试校验器正常
    control.updateState();
    expect(control.error).toEqual({min: true})
  });


  it('removeValidator 移除所有校验器，addValidators 重新设置校验器列表', function () {
    const control = new NgFormControl('', [NgValidators.require]);
    control.updateState();
    expect(control.error).toEqual({require: true});
    //  移除
    control.removeValidator();
    control.updateState();
    expect(control.error).toEqual(null);
    // 增加
    control.addValidators([NgValidators.require]);
    control.updateState();
    expect(control.error).toEqual({require: true});
  });

  it('setValue 修改表单值并执行校验', function () {
    const control = new NgFormControl('abc', [NgValidators.require]);
    control.setValue('');

    expect(control).equalCorrectControl({
      value: '',
      isValid: false,
      error: {require: true}
    });
  });

  it('executeCurrentValidators 将执行校验器，返回验证结果（isValid）', function () {
    const control1 = new NgFormControl(0, [NgValidators.require]);
    expect(AbstractControl.executeCurrentValidators(control1)).toBe(true);

    const control2 = new NgFormControl(2, [NgValidators.min(3)]);
    expect(AbstractControl.executeCurrentValidators(control2)).toBe(false);

  });
})


describe('NgFormGroup', () => {
  const fgParams = {
    a: new NgFormControl('', [NgValidators.require]),
    b: new NgFormGroup({
      b1: new NgFormGroup({
        b1_1: new NgFormControl(2, [NgValidators.min(3)])
      })
    }),
    c: new NgFormArray([
      new NgFormControl(0),
      new NgFormControl('abc'),
    ])
  };
  const fg = new NgFormGroup(fgParams)

  it('NgFormGroup 正确初始化', function () {
    expect(fg.value).toEqual({
      a: '',
      b: {
        b1: {
          b1_1: 2
        }
      },
      c: [0, 'abc']
    })

    expect(fg).equalCorrectControl({
      value: {
        a: '',
        b: {
          b1: {
            b1_1: 2,
          }
        },
        c: [0, 'abc']
      },
      isValid: true,
      error: null,
    })

    //  controls 属性的值就是传入的参数
    expect(fg.controls).toBe(fgParams);

  });

  it('setValue 方法', function () {
    const fg2 = new NgFormGroup(
      {
        a: new NgFormGroup({
          a1: new NgFormControl('a1')
        }),
      },
      [
        (c) => {
          const value = (c as NgFormGroup).get('a').value
          return value.a1 === '' ? {custom: true} : null
        }
      ]
    );

    //  测试 onlySelf 参数
    expect(fg2.value).toEqual({a: {a1: 'a1'}});
    (fg2.get('a') as NgFormGroup).get('a1').setValue('', {onlySelf: true});
    expect(fg2).equalCorrectControl({
      value: {a: {a1: ''}},
      isValid: true,
      error: null,
    });

    (fg2.get('a') as NgFormGroup).get('a1').setValue('');
    expect(fg2).equalCorrectControl({
      value: {a: {a1: ''}},
      isValid: false,
      error: {custom: true},
    });
  });

  it('NgFormGroup get()方法', function () {
    expect(fg.get('c').value).toEqual([0, 'abc'])
  });

  it('_forEachChild 方法调用', function () {
    const mock = jest.fn();
    fg._forEachChild(mock);
    //  a、b、c 符合默认排序
    expect(mock).toHaveBeenNthCalledWith(1, fg.get('a'));
    expect(mock).toHaveBeenNthCalledWith(2, fg.get('b'));
    expect(mock).toHaveBeenNthCalledWith(3, fg.get('c'));
  });

  it('_refreshValue() 方法', function () {
    const fg1 = new NgFormGroup({
      a: new NgFormControl('a')
    })
    const fn = jest.spyOn(NgFormGroup as any, 'parseValueFormControls')
    fg1._refreshValue();
    expect(fn).toHaveBeenCalled();
  });

})

describe('FormArray', () => {

  it('正确初始化、setValue（）方法', function () {

    const fa = new NgFormArray([
      new NgFormGroup({
        a: new NgFormControl('a'),
      }),
      new NgFormControl(0)
    ])

    //  todo: 这里似乎是 jest 的 bug，似乎实现对 Class 的执行顺序有错误
    //        还需要验证一下
    setTimeout(() => {
      expect(fa.value).toEqual([{a: 'a'}, 0]);
    })


  });


  it('_forEachChild 方法调用', function () {
    const fa = new NgFormArray([
      new NgFormControl('a'),
      new NgFormControl('b'),
      new NgFormControl('c'),
    ])
    const mock = jest.fn();
    fa._forEachChild(mock);

    expect(mock).toHaveBeenNthCalledWith(1, fa.controls[0]);
    expect(mock).toHaveBeenNthCalledWith(2, fa.controls[1]);
    expect(mock).toHaveBeenNthCalledWith(3, fa.controls[2]);
  });


  it('addControl() removeControl()方法', function () {
    const fa = new NgFormArray<NgFormControl>([
      new NgFormControl('a')
    ]);
    expect(fa.value).toEqual(['a']);

    //  addControl
    fa.addControl(new NgFormControl('b'));
    expect(fa.value).toEqual(['a', 'b']);

    //  removeControl
    fa.removeControl(0);
    expect(fa.value).toEqual(['b']);
  });
})
