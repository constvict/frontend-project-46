const formatJSON = (diffTree) => {
  const replacer = null;
  const space = 0;
  return JSON.stringify(diffTree, replacer, space);
};

export default formatJSON;
