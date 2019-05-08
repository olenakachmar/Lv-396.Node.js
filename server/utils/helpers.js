const reducePropsToObject = (propsArray, req) => propsArray.reduce((obj, el) => {
  if (req.body[el]) {
    return {
      ...obj,
      [el]: req.body[el],
    };
  }
  return {
    ...obj,
  };
}, {});

module.exports = {
  reducePropsToObject,
};
