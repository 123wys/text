<template>
  <div>
    <input type="text" v-model="msg"/>
    <input type="button" v-on:click="setName" value="点我"/>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'IndexHeader',
    data(){
      return {
        msg: ''
      }
    methods: {
      setName(){
        this.$store.commit('showUserName2', this.msg);

        this.$http.get(BASE_URL + '/api/customers')
          .then((response) => {
            console.log(response);
          })
          .catch(function(response) {
            console.log(response)
          })

 /*       const _this = this;
        _this.$http.post(BASE_URL + '/user_action/login.json', {
          loginName: 'wangxian',
          password: 'wangxian123',
          mid: 'zatech'
        }).then((data) => {
          console.log(data);
        }, (error)=> {
          console.log(error);
        }).catch(function (response) {
          console.log(response)
        })*/
      }
    }
  }
</script>
