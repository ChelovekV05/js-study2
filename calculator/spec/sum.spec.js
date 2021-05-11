const sum = require('../js/main').sum;

describe('проверка суммирования', () => {
  it('сумма чисел 10 и 5', () => {
    expect(sum(10, 5)).toBe(15);
  });
  it('сумма чисел 10 и -95', () => {
    expect(sum(10, -95)).toBe(-85);
  });
  it('сумма чисел 10.5 и 15', () => {
    expect(sum(10.5, 15)).toBe(25.5);
  });
  it('если передана строка', () => {
    expect(sum(10, 'asd')).toBeUndefined();
  });
  it('если передан NaN', () => {
    expect(sum(10, NaN)).toBeUndefined();
  });
  it('если передан undefined', () => {
    expect(sum(10)).toBeUndefined();
  });
});