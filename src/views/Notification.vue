<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
<div>
  <transition class="fade">
  <div class="Notification">
    <div v-if="show" id="alert" v-bind:class="notificationData.errorClass" class="alert" role="alert" >
      <strong>{{notificationData.message}}</strong> {{notificationData.description}}
    </div>
  </div>

  </transition>
</div>
</template>

<script type="text/babel">
  import { EventBus } from '../event_bus/global-event-bus';

  export default {
    data() {
      return {
        show: false,
        notificationData: {
          message: '',
          description: '',
          errorClass: ''
        }
      }
    },
    created() {
      EventBus.$on('notification-emit', notification => {
        this.notificationData.message = notification.message;
        this.notificationData.description = notification.description;
        this.notificationData.errorClass = notification.classType;
        this.show = true;
        var parent = this;
        setTimeout(function(){ parent.show = false; }, 5000);
      })
    }
  }
</script>

<style>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }

  .Notification {
    position: fixed;
    bottom: 30px;
    left: 50%;
    width: auto;

    transform: translate(-50%, 0);
  }
</style>