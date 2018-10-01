<template>

  <div class="app flex-row " style="background-color:#EDECED">
      
    <div class="container align-items-center" style="padding-top:4%">
      
      <b-row class="justify-content-center">
     
        <b-col md="7">
            <b-row class="justify-content-center">
                <img  class="img-rec" src="static/img/adaming.png" >
                </b-row>
          <b-card-group >
            <b-card no-body class="p-4"  style="background-color:#747579">
              
              
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="material-icons">person</i>
                </b-input-group-text>
                </b-input-group-prepend>
                  <input v-model="user.login" type="text" class="form-control" placeholder="login">
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="material-icons">lock</i>
                    </b-input-group-text>
              </b-input-group-prepend>
                  <!--<input v-model="user.passWord" type="password" class="form-control">-->
                  <input v-model="user.passWord" @keyup.enter="login()" type="password" class="form-control" placeholder="password">

                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" style="background-color:#E20520;border-color:#E20520;color:white" class="px-4"  @click="login()">Connexion</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" style="color:#FFFFFF" @click="forgetPassword()" class="px-0">Mot de passe oublié</b-button>
                  </b-col>
                </b-row>
              <div v-if="required">
              <br>
              <alert class="echec">		
              <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  	            vérifier les champs obligatoires!
                </alert>
              </div>
            </b-card>
            
          </b-card-group>
           
         
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// import authentication service
import AuthService from "@/services/user/AuthService";
import Header from "@/components/Header/Header";

export default {
  name: "auth",
  data() {
    return {
      loginRequired:false,
      required:false,
      echecAuth:false,
      user: {
         login: null, 
         passWord: null 
         },
       alerts: [],
        duration: 8000,
        flagForgetPassword:false,
    };
  },
 components: {
    Header
  },
  created(){
    var vm=this;
    
  },
  computed: {
    auth_translate() {
      return this.translate("RDVLangue");
    }
  },
  methods: {
    /*addAutoDismissAlert () {
        this.alerts.push({key: new Date().getTime()})
      },*/
      
    forgetPassword(){
      var vm=this;
      if (vm.user.login == null || vm.user.login == undefined){
          vm.loginRequired=true;
          setTimeout(()=>{
              vm.loginRequired=false;
          },3000); 
      }else{   
      vm.flagForgetPassword=true;
      vm.addAutoDismissAlert();
       AuthService.forgetPassword('admin').then(resultat=>{
         console.log(resultat);
       })}
    },
    login() {
      var vm = this
      if (vm.user.login == null ||
          vm.user.login==undefined ||
          vm.user.passWord==null||
          vm.user.passWord==undefined)
      {
        vm.required=true;
        setTimeout(()=>{
            vm.required=false;
        },3000); 
      }
      else{
        //AuthService.login(vm.user).then(
        //response => {
          //var jwtToken = response.headers.authorization;
          //AuthService.saveToken(jwtToken);
          window.localStorage.setItem("currentUser", vm.user.login)
          vm.$router.push("/accueil")
        //},
        /*() => {
          vm.infoError = true;
          this.dismissCountDown = this.dismissSecs;
          vm.loader = false;
          vm.user = {};
          vm.echecAuth=true;
          setTimeout(()=>{
              vm.echecAuth=false;
          },3000); 
     
        }
      );*/
      }
    
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-rec {
  width: 66%;
  height: 60%;
}
.auth-position {
  padding-top: 35%;
}
.img-asb {
  padding-left: 0%;
  float: none;
  clear: both;
  width: 100%;
}
.echec {
    padding: 20px;
    background-color: #f44336; /* Red */
    color: white;
    margin-bottom: 15px;
}
/* The close button */
.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 1.5s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
    color: black;
}
</style>