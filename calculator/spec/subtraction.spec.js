const subtraction = require('../js/main').subtraction;

describe('проверка вычитания', () => {
  it('10 - 5', () => {
    expect(subtraction(10, 5)).toBe(5);
  });
  it('10 - (-95)', () => {
    expect(subtraction(10, -95)).toBe(105);
  });
  it('25.5 - 5', () => {
    expect(subtraction(25.5, 5)).toBe(20.5);
  });
  it('если передана строка', () => {
    expect(subtraction(10, 'asd')).toBeUndefined();
  });
  it('если передан NaN', () => {
    expect(subtraction(10, NaN)).toBeUndefined();
  });
  it('если передан undefined', () => {
    expect(subtraction(10)).toBeUndefined();
  });
});