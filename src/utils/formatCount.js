const formatCount = (value) => {
  if (value < 1000) {
    return String(value);
  }

  return `${(value / 1000).toFixed(1).replace(".0", "")}k`;
};

export default formatCount;
