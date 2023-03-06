export const elapsedText = (name, index) => {
  return name.length > index ? name.substr(0, index) + '...' : name;
};
