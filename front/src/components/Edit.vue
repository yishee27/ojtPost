<template>
  <div class="nowone">
    <div id = "header">
      <Header/>
    </div>
    <div id="firstTitle">
      <h2 id="title">게시글 수정/삭제</h2>
      <b-button id="rightBtn" variant="outline-primary" @click="deletePost">삭제</b-button>
    </div>
    <div id="inputDiv">
      <b-form-input id="inputTitle" v-model="Title" ></b-form-input>
      <b-form-textarea id="textarea" v-model="Contents" rows="8" max-rows="15"></b-form-textarea>
    </div>

    <div id="btnDiv">
        <b-button variant="light" @click="back">취소</b-button>
        <b-button variant="primary" @click="editPost">수정</b-button>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import Header from './Header'
  
  export default {
    name: 'Edit',
    components:{
      'Header': Header
    },
    data() {
      const postId = this.$route.params.postId;
      const item = this.readPost(postId);
      return{
        postId : postId,
        Title: null,
        Contents: null
     };
   },  
    methods: {
      back() {
        this.$router.push({
          path:'/mylist'
        })
      },
      async readPost(postId) {
        try {
        const res = await axios.post('http://localhost:9000/graphql',{
            query: `
              query{
                readPosts(Id:"${postId}"){
                 Title
                 Contents
              }
            }`
          });
          this.Title = res.data.data.readPosts[0]["Title"];
          this.Contents = res.data.data.readPosts[0]["Contents"];
        
        } catch (error) {
          console.log( "readpostError")
          throw error;       
        }
      }, 

      async editPost() {
        try {
          await axios.post(
            'http://localhost:9000/graphql',{
              query: `
                mutation{
                  editPosts(
                    Id:"${this.postId}"
                    Title: "${this.Title}"
                    Contents: "${this.Contents}"
                    ModifiedDate: ""
                ){
                    resultCount
                }
              }`
            },
          );
          alert(`수정되었습니다.`);
          this.back();
        } catch (error) {
          console.log( this.postId );
          console.log(`editPost Funtion error : ${error}`);
          throw error;
        }
      },

      async deletePost() {
        try {
          await axios.post(
            'http://localhost:9000/graphql',{
              query: `
                mutation{
                  deletePosts(
                    Id:"${this.postId}"
                ){
                    resultCount
                }
              }`
            },
          );
          alert(`삭제되었습니다.`);
          this.back();
        } catch (error) {
          console.log(`deletePost Funtion error : ${error}`);
          throw error;
        }
      }

    }
  }
</script>

<style>
  .row>div{
      text-align: left;
  }
  #firstTitle{
    margin-top:5rem;
  }
  #title{
    float:center;
  }
  #rightBtn{
    float: right;
    margin-right: 5rem;
  }
  #inputDiv{
    margin:5rem 5rem;    
  }
  #inputTitle{
    margin-bottom:2rem;
  }
  
</style>