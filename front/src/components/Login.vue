<template>
  <div class="login">
    <h1 style="font-weight: bold; margin-bottom:4rem;">LOGIN</h1>
    <b-row>
      <b-col lg="5" class="pb-2"></b-col>
      <b-col lg="2" class="pb-2">
        <b-form-input v-model="uid" placeholder="ID" ></b-form-input>
      </b-col>
    </b-row> 
    <b-row>
      <b-col lg="5" class="pb-2"></b-col>
      <b-col lg="2" class="pb-2">
        <b-form-input v-model="password" placeholder="PASSWORD"></b-form-input>
      </b-col>
    </b-row>
    <div style="margin-top:1rem;">
      <b-button v-on:click="join()"> Join </b-button>
      <b-button variant="primary" v-on:click="login()">Login</b-button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import store from '../../store/store'

export default {
  name: 'Login',
  data: () => ({
    uid: '',
    password: '',
    token: '',
    userData: ''
  }),
  methods: {
    list() {
      this.$router.push({
        path:'/list'
      })
    },
    join() {
      this.$router.push({
        path:'/join'
      })
    },
    async login() {
      this.token = undefined;
      try {
        const res = await axios.post('http://localhost:9000/graphql', {
          query: `
            query{
              login(UserId:"${this.uid}",UserPW:"${this.password}"){
                token
                user{
                  Company
                  UserId
                  UserName
                  No
                }
              }
            }
          `
        })
 
        this.token = res.data.data.login.token;
        store.dispatch('LOGIN',  res.data.data.login.token);
        store.dispatch('UserName', res.data.data.login.user.UserName);
        store.dispatch('UserNo', res.data.data.login.user.No);
        store.dispatch('UserId', res.data.data.login.user.UserId);
        store.dispatch('Company', res.data.data.login.user.Company);

        axios.defaults.headers.common['x-access-token'] = res.data.data.accessToken;

        if( this.token != null ){
          this.list();
        }
        else{
          alert('token error');
        }
        
      } catch (error) {
        alert('wrong login : ' + error)
      }
    }
  }
}
</script>

<style>
.login{
  text-align: center;
  margin-top : 10rem;
}
.loginInput{
  text-align: center;
}

#loginId, #loginPw {
  font-size: 2rem;
}

</style>
