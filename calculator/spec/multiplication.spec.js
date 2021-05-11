const multiplication = require('../js/main').multiplication;

describe('проверка умножения', () => {
  it('10 * 5', () => {
    expect(multiplication(10, 5)).toBe(50);
  });
  it('15 * (-5)', () => {
    expect(multiplication(15, -5)).toBe(-75);
  });
  it('10 * 4.5', () => {
    expect(multiplication(10, 4.5)).toBe(45);
  });
  it('если передана строка', () => {
    expect(multiplication(10, 'asd')).toBeUndefined();
  });
  it('если передан NaN', () => {
    expect(multiplication(10, NaN)).toBeUndefined();
  });
  it('если передан undefined', () => {
    expect(multiplication(10)).toBeUndefined();
  });
});