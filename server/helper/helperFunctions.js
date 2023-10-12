module.exports.areInputsPositive = (inputArray) => {
  for (const number of inputArray) {
    if (number < 0) return false;
  }
  return true;
};
