<template>
  <div class="mylist">
    <div id = "header">
      <Header/>
    </div>
    <div id="firstTitle">
        <h2 id="title">내가 쓴 글</h2>
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

  console.log(store.state  );
  export default {
    name: 'Mylist',
    components:{
      'Header': Header
    },
    data() {
      const UserId = store.state.UserId;
      return {
        fields: [ 
            {key:"Title", label:'제목'},
            {key:"CreatedDate", label:'날짜'},
            {key:"Counter", label:'조회수'}
        ],
        items:this.getMylist(UserId),
      }
    },
    methods: {
      rowClick(item, index, e){
        this.$router.push({
          path:`/edit/${item._id}`
        })
      },
      async getMylist(UserId) {
        try {
          const res = await axios.post('http://localhost:9000/graphql',{
            query: `
              query{
                getMyposts(UserId:"${UserId}"){
                 _id
                 Title
                 CreatedDate
                 Counter
              }
            }`
          });
          this.items = res.data.data.getMyposts;
        } catch (error) {
          console.log( "getMylistError")
          throw error;       
        }
      },   

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

</style> 