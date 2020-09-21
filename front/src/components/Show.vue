<template>
  <div class="show">
    <div id = "header">
      <Header/>
    </div>
    <div id="firstTitle">
      <h2 id="title">게시글 보기</h2>
      <b-button id="rightBtn" variant="light" @click="back">뒤로가기</b-button>
      <div style="clear:both;"></div>
    </div>
    <div id="titleDiv">
      <b-row>
      <b-col lg="6">제목:{{item.Title}}</b-col>
      <b-col lg="3">작성자:{{item.UserId}}</b-col>
      <b-col lg="3">날짜:{{item.CreatedDate}}</b-col>
      </b-row>  
    </div>
    <div id="contentDiv">
      {{item.Contents}}
    </div>
    <div id="replyDiv">
      <h6>댓글</h6>
    </div>

    <div id="replyDiv">
      <b-row>
        <b-col lg="10">  
          <b-form-input  id="inputReply" v-model="replyData['reply']" placeholder="댓글을 입력해 주세요"></b-form-input>
        </b-col>
        <b-col lg="2" id="replyBtn">
          <b-button variant="info" @click="createReply">댓글달기</b-button>
        </b-col>
      </b-row>
    </div>
  
    
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from './Header'

  export default {
    name: 'Show',
    components:{
      'Header': Header
    },
    data() {
      const postId = Number(this.$route.params.postId);
      const item = this.readPost(postId);
      return{
        item : item,
        replyData:{
          "reply" :null,
          "UserId" : this.$cookie.get('UserId'),
          "Company" : this.$cookie.get('Company'),
          "postId": postId
        }
      };
    },
    methods: {
      back() {
        this.$router.push({
          path:'/list'
        })
      },
      async readPost(postId) {
        try {
        const res = await axios.post('http://localhost:9000/graphql',{
            query: `
              query{
                readPosts(No:${postId}){
                 No
                 Title
                 Contents
                 UserId
                 CreatedDate
                 Counter
              }
            }`
          });
          this.item = res.data.data.readPosts[0];
        
        } catch (error) {
          console.log( "readpostError")
          throw error;       
        }
      }, 

      async createReply() {
        try {
          const res = await axios.post('http://localhost:9000/graphql',{
            query: `
              mutation{
                createReply(
                 Contents: "'${this.replyData['reply']}'"
                 UserId: "'${this.replyData['UserId']}'"
                 ParentPost: ${this.replyData['postId']}
                 Company: ${this.replyData['Company']}
                 CreatedDate: ""
              ){
                resultCount
              }
            }`
          });
          alert("댓글이 저장되었습니다.");

        } catch (error) {
          console.log( "createReply");
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
  #titleDiv{
    margin: 2rem 5rem;
    padding: .2rem 2rem 0 2rem;
    height: 2rem;
    border: 1px solid #efefef;
    border-radius: 3px;
  }
  #contentDiv{
    margin: 1rem 5rem;
    min-height: 7rem;
    text-align: left;
    padding: .2rem 2rem 0 2rem;
    border: 1px solid #efefef;
  }
  #replyDiv{
    margin: 1rem 5rem;
  }
  #replyBtn{
      text-align: right;
  }
</style>
