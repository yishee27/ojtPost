<template>
  <div class="list">
    <div id = "header">
      <Header/>
    </div>
    <div id="firstTitle">
        <h2 id="title">목록</h2>
        <b-button id="rightBtn" variant="info" @click="newone">글쓰기</b-button>
    </div>
    <div id="listTable">
      <b-table striped hover :items="items" :fields="fields" @row-clicked="rowClick"></b-table>
    </div>

  </div>


 
</template>

<script>
  import axios from 'axios'
  import Header from './Header'
  import store from '../../store/store'

  export default {
    name: 'List',
    components:{
      'Header': Header
    },
    data() {
      const Company = store.state.Company;
 
      return {
        fields: [ 
            {key:"No", label:'No.'},
            {key:"Title", label:'제목'},
            {key:"UserId", label:'작성자'},
            {key:"CreatedDate", label:'날짜'},
            {key:"Counter", label:'조회수'}
        ],
        items:this.getlist(Company),
       
    
      }
    },
    methods: {
      newone() {
        this.$router.push({
          path:'/newone'
        })
      },
      async getlist(Company) {
        try {
          const res = await axios.post('http://localhost:9000/graphql',{
            query: `
              query{
                getPosts(Company:${Company}){
                 No
                 Title
                 UserId
                 CreatedDate
                 Counter
              }
            }`
          });
          this.items = res.data.data.getPosts;
        } catch (error) {
          console.log( "getlistError")
          throw error;       
        }
      }, 
      rowClick(item, index, e){
        this.$router.push({
          path:`/show/${item.No}`
        })
      }  

    }
  }

</script>

<style>
  #firstTitle{
    margin-top:5rem;
  }
  #listTable{
    margin:5rem 5rem;
  }
  #title{
    float:center;
  }
  #rightBtn{
    float: right;
    margin-right: 5rem;
  }

</style>