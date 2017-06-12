<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link" v-bind:class="{ active: active.overview }" href="#"
             v-on:click="setSelection('overview')">Overview
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-on:click="setSelection('add')" v-bind:class="{ active: active.add }">Add</a>
        </li>

      </ul>
    </div>

    <div class="card-block">
      <!--<h4 class="card-title">Special title treatment</h4>-->
      <UserTable v-if="(selection === 'overview')"/>
      <UserAddForm v-if="(selection === 'add')"/>
    </div>
  </div>
</template>

<script>
  import UserTable from '../components/UserTable.vue'
  import UserAddForm from '../components/UserAddForm.vue'

  export default {
    name: 'app-user-widget',
    data () {
      return {
        selection: 'overview',
        active: {
          overview: true,
          add: false
        }

      }
    },
    methods: {
      setSelection: function (selector) {
        switch (selector) {
          case 'overview':
            this.active.overview = true
            this.active.add = false
            break
          case 'add':
            this.active.overview = false
            this.active.add = true
        }

        this.selection = selector
      },

      handleClick (e) {
        e.preventDefault()
        e.target.parentElement.classList.toggle('open')
      }
    },
    components: {
      UserTable,
      UserAddForm
    }
  }
</script>

<style scoped>
  .card-block{
    padding: 0;
    /*padding-top: 100px;*/
  }
</style>
