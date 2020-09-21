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

  export default {
    name: 'Header',
    data(){
      return {
        UserName : this.$cookie.get('UserName')
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
       deleteAllCookies();
       this.$router.push({
         path:'/'
       })
     }
    }
  }

  //쿠키 삭제
  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
</script>
 
<style scoped>
</style>

