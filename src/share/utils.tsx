import {union} from 'lodash-es';

//  针对对象数组中的某一个字段的值，取并集
export function unionListField<T, K extends keyof T>(
  list: T[],
  field: K,
): T[K] | T[K][] {
  return list.reduce((acc, item) => {
    const curValue = item[field];
    if (!Array.isArray(curValue)) {
      return curValue == null ? acc : union(acc, [curValue]);
    }
    return union(acc, curValue);
  }, [] as T[K][]);
}
