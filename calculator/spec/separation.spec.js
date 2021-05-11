const separation = require('../js/main').separation;

describe('проверка деления', () => {
  it('10 / 5', () => {
    expect(separation(10, 5)).toBe(2);
  });
  it('80 / (-4)', () => {
    expect(separation(80, -4)).toBe(-20);
  });
  it('10 / 2.5', () => {
    expect(separation(10, 2.5)).toBe(4);
  });
  it('если передана строка', () => {
    expect(separation(10, 'asd')).toBeUndefined();
  });
  it('если передан NaN', () => {
    expect(separation(10, NaN)).toBeUndefined();
  });
  it('если передан undefined', () => {
    expect(separation(10)).toBeUndefined();
  });
});