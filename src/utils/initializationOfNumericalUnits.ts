export const hasUnit = (value: string) => {
  // 正则表达式匹配数字后跟单位（如 px, em, %, % 等）
  const unitPattern =
    /^[+-]?(\d*\.|)\d+(\s*)(px|em|rem|%|vw|vh|pt|in|cm|mm|ex|ch|vmin|vmax)$/i;
  return unitPattern.test(value);
};
export default (value: number | string) =>
  hasUnit(String(value)) ? value : `${value}px`;
