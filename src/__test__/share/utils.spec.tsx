import {unionListField} from "../../share/utils";


describe('unionListField', () => {
  it('在对象数组中，将对象中某个Key的值进行去重合并,', function () {
    const input = [
      {key: [0, 1, 2, 3]},
      {key: [2, 3, 4]},
      {key: [5, 6]},
      {key: 7},  // 非数组也允许合并
    ]

    const resulet = unionListField(input, 'key');

    expect(resulet).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });
})

