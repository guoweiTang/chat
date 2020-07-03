export const sessionMap = function(state) {
  let map = new Map();
  state.sessionList.forEach(function(item, index) {
    map.set(item.sessionId, index);
  })
  return map;
}
