<template>
<div class="header">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" @click="list">게시판</b-nav-item>
        <b-nav-item href="#" @click="mylist">내가 쓴 글</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand href="#" @click="list">안녕하세요 {{UserName}} 님</b-navbar-brand>
        <b-nav-item href="#" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
 
<script>
  import axios from 'axios'
  import store from '../../store/store'

console.log(store.state);
  export default {
   
    name: 'Header',
    computed: {
      isAuthenticated: function() {
        console.log(localStorage);
        if(localStorage.accessToken) return true;
        else return false
      }
    },
    data(){
      return {
        UserName : store.state.UserName
      }
    },

    methods: {
      list() {
        this.$router.push({
          path:'/list'
        })
      },
      mylist() {
        this.$router.push({
          path:'/mylist'
        })
      },
      logout(){
       store.dispatch('LOGOUT');
       this.$router.push({
         path:'/'
       })
     }
      
    }
  }

</script>
 
<style scoped>
</style>

