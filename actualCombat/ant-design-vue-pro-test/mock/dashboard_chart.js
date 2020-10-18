function chart(method) {
  let res = null;
  switch(method) {
    case "GET":
      res = [90, 55, 32, 65, 11, 38];
      break;
    default:
      res = null;
  }
  return res;
}
module.exports = chart;
