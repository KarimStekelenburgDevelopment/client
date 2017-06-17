/**
 * Created by karimstekelenburg on 12/06/2017.
 */

import {EventBus} from '../../event_bus/global-event-bus';

export default function (Vue) {
  Vue.modals = {
    showEditUserModal (userId){
      EventBus.$emit('user-edit-modal', userId);
    },
    showEditTableModal (tableId){
      EventBus.$emit('table-edit-modal', tableId);
    },
    showAddTableModal (areaId){
      EventBus.$emit('table-add-modal', areaId);
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
