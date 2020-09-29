const encodeUpdateValue = (updateValue) => {
  const encodedStr = updateValue
    .replace(/%/g, "%25")
    .replace(/[\n]/g, "%0A")
    .replace(/\//g, "%2f")
    .replace(/\\/g, "%5C")
    .replace(/\?/g, "%3f")
    .replace(/'/g, "''")
    .replace(/#/g, "%23");

  return encodedStr;
};

export default encodeUpdateValue;