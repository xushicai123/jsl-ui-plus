export default (duration: number | string) => {
  // 定义正则表达式来匹配包含单位的字符串
  const hasUnitPattern = /^[0-9]+(?:\.[0-9]+)?(s|ms)$/i;

  // 将 duration 转换为字符串进行处理
  const durationStr = String(duration);

  // 检查 duration 是否包含单位
  if (hasUnitPattern.test(durationStr)) {
    // 如果包含单位，直接返回
    return durationStr;
  } else {
    // 如果没有单位，默认添加秒（s）作为单位
    return `${durationStr}s`;
  }
};
