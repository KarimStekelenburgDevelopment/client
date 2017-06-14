/**
 * Created by karimstekelenburg on 12/06/2017.
 */

import {EventBus} from '../../event_bus/global-event-bus';

export default function (Vue) {
  Vue.notify = {
    alert (message, description, alarmClass) {
      var notification = {
        message: message,
        description: description,
        classType: alarmClass,

      };
      EventBus.$emit('notification-emit', notification);
    }
  }


  Object.defineProperties(Vue.prototype, {
    $notify: {
      get () {
        return Vue.notify
      }
    }
  })
}

