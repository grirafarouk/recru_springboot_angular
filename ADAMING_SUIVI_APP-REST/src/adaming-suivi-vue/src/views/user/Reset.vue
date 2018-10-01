<template>

  <div class="app flex-row " style="background-color:white">
   <Header></Header>
    <div class="container align-items-center" style="padding-top:10%">
      
      <b-row class="justify-content-center">
     
        <b-col md="9">
          
         
        <img  class="img-asb" src="static/img/asb1.png">
          <b-card-group >
            <b-card no-body class="p-4"  style="background-color:#E4E5E6">
              <b-card-body class="auth-position">
                




                <p class="text-muted">{{auth_translate.reset}}</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <input v-model="user.passWord" type="password" class="form-control" :placeholder="auth_translate.password":class="{ 'has-error': errors.has('password') }" name="password" v-validate="'required'">
                </b-input-group>
                <b-input-group class="mb-3">
                <span class="danger" v-show="errors.has('password')" >
                {{ errors.first('password') }} 
                  </span>
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <input v-model="user.confirmPassWord" type="password" class="form-control" :class="{ 'has-error': errors.has('confirmPassWord') }" name="confirmPassWord" v-validate="'required'" :placeholder="auth_translate.confirmPassword" >
                </b-input-group>
      <b-input-group class="mb-3">
          <span class="danger" v-show="errors.has('confirmPassWord')" >
                {{ errors.first('confirmPassWord') }} 
          </span>
      </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" style="background-color:#E20520;border-color:#E20520;color:white" class="px-4" @click="reset()">{{auth_translate.btnReset}}</b-button>
                  </b-col>
                </b-row>
                <div v-if="flagNotMatch">
                        <font color="red"> *{{auth_translate.notmatch}}</font>
                </div>
                <div v-if="showAlert">
                        <font color="red"> *{{auth_translate.erreur}}</font>
                </div>
                <div v-if="required">
                        <font color="red"> *{{auth_translate.required}}</font>
                </div>
              </b-card-body>
            </b-card>
            
          </b-card-group>
           <div><img src="static/img/asb3.png"/></div>
         
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// import authentication service
import Header from "@/components/Header/Header";
import AuthService from "@/services/user/AuthService";

export default {
  name: "reset",
  data() {
    return {
      required:false,
      showAlert:false,
        alerts: [],
        duration: 8000,
        flagNotMatch:false,
    user: { confirmPassWord: null, passWord: null },
    };
  },
 components: {
    Header
  },
  created(){
   var vm=this;
   console.log(vm.$route.params.login);
    
  },

   computed: {
   auth_translate() {
      return this.translate("auth_translate");
    }
  },
  methods: {
    validate() {
       this.$validator.validateAll()
       return this.errors.any()
    },
   
 reset(){
   var vm=this;
   console.log(vm.user)
   console.log(vm.$route.params.login);
   var newUser={
     login:vm.$route.params.login,
     password:vm.user.passWord,
     newPassword:vm.user.confirmPassWord
   }
  if (newUser.password== null ||newUser.password == undefined || newUser.newPassword== null || newUser.newPassword==undefined){
    vm.required=true;
  }
  else{
         if (newUser.password == newUser.newPassword){
      AuthService.reinstallPassword(newUser).then(response=>{
        console.log(response.data);
        if (response.data =='update with success'){
          vm.$router.push('/')
        }else{
           vm.showAlert=true;
        }

      })
     }
     else {
       console.log("password and confirmation did not match");
       vm.flagNotMatch=true;
     }
  }

 }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.has-error{
      color : red;
      border-color : red;
      border-block-start-color: red;
      background-color: #fff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(240, 8, 8, 0.25);
    }
    .danger{
      color: red
    }
    .isDisabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
</style>