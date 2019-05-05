const reducePropsToObject = (propsArray, req) => propsArray.reduce((obj, el) => {
  if (req.query[el]) {
    return {
      ...obj,
      [el]: req.query[el],
    };
  }
  return {
    ...obj,
  };
}, {});

module.exports = {
  reducePropsToObject,
};
