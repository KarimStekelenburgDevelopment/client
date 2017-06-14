/**
 * Created by karimstekelenburg on 12/06/2017.
 */

import {EventBus} from '../../event_bus/global-event-bus';

export default function (Vue) {
  Vue.modals = {
    showEditUserModel (userId){
      EventBus.$emit('user-edit-modal', userId);
    }
  }


  Object.defineProperties(Vue.prototype, {
    $modals: {
      get () {
        return Vue.modals
      }
    }
  })
}

/**
 * Created by karimstekelenburg on 14/06/2017.
 */
