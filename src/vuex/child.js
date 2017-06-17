// src/child.js
export default store => (store.state.user.roleInfo.id ? store.state.user.roleInfo : null);