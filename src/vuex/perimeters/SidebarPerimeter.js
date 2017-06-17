// src/perimeters/byePerimeter.js
import BasePerimeter from './BasePerimeter';
export default new BasePerimeter({
  purpose: 'bye',
  govern: {
    'can route': () => true,
    'can viewUserLink': function () {
      return this.isAdmin();
    },
  },
});
