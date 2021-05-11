function sum(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (Number.isFinite(a) && Number.isFinite(b)) {
    return a + b;
  }

  return undefined;
}

module.exports = sum;