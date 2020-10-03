<template>
  <div class="join">
    <h1 style="font-weight: bold">JOIN</h1>

    <b-row>
      <b-col lg="6" class="leftInput">
        <div >
            <span class="subTitle">ID</span>
            <span class="inputSpan">
                <b-form-input id="inputTitle" v-model="createUser['UserId']" placeholder="아이디" ></b-form-input>
            </span>
            <span class="rightSpan">
                <b-button @click="IdDuplCheck">중복확인</b-button>
            </span>
        </div>
        <div>
            <span class="subTitle">PASSWORD</span>
            <span class="inputSpan">
                <b-form-input id="inputTitle" v-model="createUser['UserPW']" placeholder="비밀번호" ></b-form-input>
            </span>
            <span class="rightSpan"></span>
        </div>
        <div>
            <span class="subTitle">PASSWORD check</span>
            <span class="inputSpan">
                <b-form-input id="inputTitle" v-model="createUser['UserPWcheck']" placeholder="비밀번호 확인" ></b-form-input>
            </span>
            <span class="rightSpan"></span>
        </div>
        <div>
            <span class="subTitle">CODE</span>
            <span class="inputSpan">
                <b-form-input id="inputTitle" v-model="createUser['Company']" placeholder="회사코드" ></b-form-input>
            </span>
            <span class="rightSpan"></span>
        </div>
      </b-col>

      <b-col lg="6" class="rightInput">
        <div >
            <span class="subTitle_2">NAME</span>
            <span class="inputSpan_2">
                <b-form-input id="inputTitle" v-model="createUser['UserName']" placeholder="이름" ></b-form-input>
            </span>
        </div>
        <div>
            <span class="subTitle_2">E-MAIL</span>
            <span class="inputSpan_2">
                <b-form-input id="inputTitle" v-model="createUser['UserEmail']" placeholder="이메일" ></b-form-input>
            </span>
        </div>
        <div>
            <span class="subTitle_2">PHONE</span>
            <span class="inputSpan_2">
                <b-form-input id="inputTitle" v-model="createUser['UserMobile']" placeholder="-이외 숫자만 입력해 주세요" ></b-form-input>
            </span>
        </div>        
      </b-col>
    </b-row> 

    <div>
        <b-button variant="light" @click="back">취소</b-button>
        <b-button variant="info" @click="createUsers">가입하기</b-button>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    name: 'Join',
    data() {
      return{
        IdCheck : false,
        createUser: {
          "UserId" : null,
          "UserPW" : null,
          "UserPWcheck" : null,
          "Company" : null,
          "UserName" : null,
          "UserEmail" : null,
          "UserMobile" : null
        } 
      };
    },
    
    methods: {
      back() {
        this.$router.push({
          path:'/'
        })
      },

      async IdDuplCheck(){
        try{

          const res = await axios.post('http://localhost:9000/graphql', {
          query: `
            query{
              IdDuplCheck(UserId: "${this.createUser['UserId']}"){
                  resultStr
              }
            }
          `
          })
    
          if( res.data.data.IdDuplCheck.resultStr == "nonexist" ){
            this.IdCheck = true;
            alert("사용가능한 아이디 입니다.");
          }
          else{
            alert("이미 사용중인 아이디 입니다.");
            return;
          }

        } catch (error) {

        }
      },

      async createUsers() {

        try {

          if(this.createUser['UserId'] === null){
            alert("아이디를 입력해 주세요.");
            return;
          }

          if(this.createUser['UserPW'] === null){
            alert("비밀번호를 입력해 주세요.");
            return;
          }

          if(this.createUser['UserPWcheck'] === null){
            alert("비밀번호를 확인해 주세요.");
            return;
          }

          if(this.createUser['UserPW'] !== this.createUser['UserPWcheck'] ){
            alert("비밀번호가 일치하지 않습니다.");
            return;
          }

          if(this.createUser['Company'] === null ){
            alert("회사코드를 입력해 주세요.");
            return;
          }

          if(this.createUser['UserName'] === null ){
            alert("이름을 입력해 주세요.");
            return;
          }

          if( this.IdCheck == false ){
            alert("아이디 중복확인을 진행해 주세요.");
            return;
          }

          if( this.IdCheck == true ){
            await axios.post(
             'http://localhost:9000/graphql',{
               query: `
                mutation{
                  createUsers(
                    UserId: "${this.createUser['UserId']}"
                    UserPW: "${this.createUser['UserPW']}"
                    Company: ${this.createUser['Company']}
                    UserName: "${this.createUser['UserName']}"
                    UserEmail: "${this.createUser['UserEmail']}"
                    UserMobile: "${this.createUser['UserMobile']}"
                    CreatedDate: ""
                  ){
                   resultCount
                  } 
                }`
              },
            );
            alert(`가입이 완료 되었습니다.`);
            this.back();
          }
        } catch (error) {
            alert(`createUser Funtion error : ${error}`);
            console.log(`createUser Funtion error : ${error}`);
            throw error;
        }       
      }
    }
  }
</script>

<style>
.leftInput >div{
    margin:2rem 0rem 1rem 1rem;
}
.rightInput >div{
    margin:2rem 4rem 1rem -5rem;
}
.join{
  text-align: center;
  margin-top : 10rem;
}
.subTitle{
    display: inline-block;
    width:30%;
    padding-right:.5rem;
    text-align: right;
    font-size: 1.3rem;
    font-weight: 500;
}
.inputSpan{
    display: inline-block;
    width:45%
}
.rightSpan{
    display: inline-block; 
    width:15%;
}
.subTitle_2{
    display: inline-block;
    width:15%;
    padding-right:.5rem;
    text-align: right;
    font-size: 1.3rem;
    font-weight: 500;
}
.inputSpan_2{
    display: inline-block;
    width:45%
}
</style>