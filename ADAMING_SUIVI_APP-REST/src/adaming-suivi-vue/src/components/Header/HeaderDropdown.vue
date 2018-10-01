<template>
 
      <b-nav-item-dropdown right no-caret>
  
        <template slot="button-content">
        
          <img src="static/img/avatars/profilIcon.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
         {{connectedUser.firstName}} {{connectedUser.lastName}} 
        </template>

       
       <a @click="logOut()"> <b-dropdown-item><i class="fa fa-lock"></i>Déconnexion</b-dropdown-item></a>
      </b-nav-item-dropdown>
</template>
<script>
import AuthService from "@/services/user/AuthService";
export default {
  name: "header-dropdown",
  data: () => {
    return { 
      itemsCount: 42,
      user:{},
      connectedUser:{} 
      };
  },
  created(){
    var vm=this;
    vm.user=localStorage.getItem("currentUser");
      AuthService.login(window.localStorage.getItem("currentUser")).then(
           res=>{
             vm.connectedUser =res.data;
           }
         ) 
  },
  methods: {
    logOut() {
      var vm = this;
      AuthService.logout();
      vm.$router.push("/");
    }
  },
  computed: {
    headerDropdown() {
      return this.translate("RDVLangue");
    }
  }
};
</script>