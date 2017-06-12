<template>
  <header class="app-header navbar">
    <slot></slot>
  </header>
</template>
<script>
export default {
  name: 'app-navbar',
  created () {
    this._navbar = true
  }
}
</script>
