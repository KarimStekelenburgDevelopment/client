/**
 * Created by karimstekelenburg on 12/06/2017.
 */

import {EventBus} from '../../event_bus/global-event-bus';

export default function (Vue) {
  Vue.update = {
    userTable (){
      EventBus.$emit('update-user-table');
    },
    areaTablesTable (){
      EventBus.$emit('update-area-tables-table');
    },

    area(){
      EventBus.$emit('update-area')
    },

    areas(){
      EventBus.$emit('update-areas');
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

