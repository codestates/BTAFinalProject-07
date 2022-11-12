const makeEllipsis = (target: string, maxLength: number) => {
  return target.slice(0, maxLength) + (target.length <= maxLength ? '' : '...');
};

export default makeEllipsis;
