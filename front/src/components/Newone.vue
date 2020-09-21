<template>
  <div class="nowone">
    <div id = "header">
      <Header/>
    </div>
    <div id="firstTitle">
        <h2 id="title">게시글 작성</h2>
    </div>
    <div id="inputDiv">
      <b-form-input id="inputTitle" v-model="createData['Title']" placeholder="제목을 입력해 주세요"></b-form-input>
      <b-form-textarea id="textarea" v-model="createData['Contents']" placeholder="내용을 입력해 주세요" rows="8" max-rows="15"></b-form-textarea>
    </div>

    <div id="btnDiv">
        <b-button variant="light" @click="back">취소</b-button>
        <b-button variant="primary" @click="createPosts">작성완료</b-button>
    </div>

    
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from './Header'
  
  export default {
    name: 'Newone',
    components:{
      'Header': Header
    },

    data() {
      return{
        createData: {
          "Title": null,
          "Contents": null,
          "UserId" : this.$cookie.get('UserId'),
          "Company" : this.$cookie.get('Company')
       }
     };
    },
    
    methods: {
      back() {
        this.$router.push({
          path:'/list'
        })
      },

      async createPosts() {
        try {
          if(this.createData['Title'] === null || this.createData['Contents'] === null ){
            alert("제목,내용을 입력해 주세요");
            return;
          }
          await axios.post(
           'http://localhost:9000/graphql',{
             query: `
              mutation{
                createPosts(
                Title: "'${this.createData['Title']}'"
                Contents: "'${this.createData['Contents']}'"
                UserId: "'${this.createData['UserId']}'"
                Company: "${this.createData['Company']}"
                CreatedDate: ""
              ){
               resultCount
              }
            }`
          },
        );
          alert(`저장되었습니다.`);
          this.back();
        } catch (error) {
            alert(`createPost Funtion error : ${error}`);
            console.log(`createPost Funtion error : ${error}`);
            throw error;
        }
      }
    }
  }
</script>

<style>
  #firstTitle{
    margin-top:5rem;
  }
  #title{
    float:center;
  }
  #inputDiv{
    margin:5rem 5rem;    
  }
  #inputTitle{
    margin-bottom:2rem;
  }
  
</style>