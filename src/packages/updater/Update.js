/**
 * Created by karimstekelenburg on 12/06/2017.
 */

import {EventBus} from '../../event_bus/global-event-bus';

export default function (Vue) {
  Vue.update = {
    userTable (){
      EventBus.$emit('update-user-table');
    }
  }


  Object.defineProperties(Vue.prototype, {
    $update: {
      get () {
        return Vue.update
      }
    }
  })
}

