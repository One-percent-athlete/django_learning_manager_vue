<template>
<div>
  <NavView />
  <router-view />
  <FooterView />
</div>
</template>

<script>
import NavView from '@/components/NavView'
import FooterView from '@/components/FooterView'
import axios from 'axios';
export default {
  name: 'App',
  components: {
    NavView,
    FooterView
  },
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.user.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma";
</style>
