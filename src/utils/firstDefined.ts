export default <T>(...args: (T | undefined)[]): T | undefined => {
  return args.find((arg) => arg !== undefined);
};
