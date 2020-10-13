// 获取当前用户的权限
export function getCurrentAuthority() {
  return ["user"];
}

// 检测对应权限是否包含
export function check(anthority) {
  const current = getCurrentAuthority();
  return current.some(item => anthority.includes(item));
}

// 是否登录
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
