<template>
<div class="row" style="padding-top:5%">
  <div class="col-sm-6 col-md-6">
    <div class="card">
        <div class="card-header">
        <div>
        <i class="fa fa-align-justify"></i> 
        {{user_translate.listUsers}}
        </div>
        </div>
        <div class="table-responsive-sm" >
          <vue-good-table
          :columns=" [
            {
            label: user_translate.login,
            field: 'login',
              filterOptions: {
                enabled: true,
              }
            },
            {
            label: user_translate.firstName,
            field: 'firstName',
              filterOptions: {
                enabled: true,
              }
            },
            {
            label: user_translate.lastName,
            field: 'lastName',
              filterOptions: {
                enabled: true,
              }
            },
            {
            label: user_translate.state,
            field: 'activated',
              filterOptions: {
                enabled: true,
              }
            },
            {
            label: user_translate.operation,
            field: 'operation',
              filterOptions: {
                enabled: true,
              }
            },
          ]"
          :rows="getAllUsers"
          :search-options="{
            enabled: true,
             placeholder: pagination_translate.search
          }"
          :pagination-options="{
            enabled: true,
            perPage: 5,
          }"
          styleClass="vgt-table  magnifying-glass"
      
          :paginationOptions="{
            enabled: true,
            perPage: 5,
            position: 'bottom',
            perPageDropdown: [5, 10, 20, 50],
            dropdownAllowAll: true,
            nextLabel: pagination_translate.next,
            prevLabel: pagination_translate.previous,
            rowsPerPageLabel: pagination_translate.rowsPerPageLabel,
            ofLabel: pagination_translate.ofLabel,
            allLabel: pagination_translate.all
      }">
      <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field==='login'">{{props.row.login}}</span>
          <span v-if="props.column.field==='firstName'">{{props.row.firstName}}</span>
          <span v-if="props.column.field==='lastName'">{{props.row.lastName}}</span>
          <span v-if="props.column.field==='activated'">
              <span v-if="props.row.activated == true || props.row.activated == 'true' "><i class="material-icons">thumb_up</i></span>
              <span v-if="props.row.activated == false || props.row.activated == 'false'"><i class="material-icons">thumb_down</i></span>
          </span>
          <span v-if="props.column.field =='operation'">
              <span v-if="!conslt" class="isDisabled"> <i class="material-icons" style="color:primary">visibility</i></span>
              <span v-if="conslt" > <a class="pointer" data-toggle="tooltip" data-placement="top" :title="user_translate.consultButton" @click="consultUser(props.row)"><i class="material-icons" style="color:primary">visibility</i></a></span>
              <a class="pointer" data-toggle="tooltip" data-placement="top" :title="user_translate.updateButton" @click="updateUser(props.row)"><i class="material-icons" style="color:primary">edit</i></a>
              <span v-if="!supp" class="isDisabled"><a class="pointer"  id="show-modal" data-toggle="tooltip" data-placement="top" :title="user_translate.deleteButton"><i class="material-icons" style="color:primary" >delete</i></a></span>
              <span v-if="supp" ><a class="pointer" @click="popUp(props.row)" id="show-modal" data-toggle="tooltip" data-placement="top" :title="user_translate.deleteButton"><i class="material-icons" style="color:primary" >delete</i></a></span>
          </span>
      </template>
      </vue-good-table>
      </div>
</div>
 <!-- popup to delete -->
              <b-modal :title="user_translate.titleDelete"  class="modal-danger" :ok-title="user_translate.submitButton" :cancel-title="user_translate.cancelButton" v-if="dangerModal" v-model="dangerModal" @ok="deleteUser()" ok-variant="danger">
                {{user_translate.supressionConfirm}} {{user.firstName}} {{user.lastName}} ?
              </b-modal>


</div>


<!-- Partie Ajout --> 

   <div class="col-sm-6 col-md-6">
      

  <div class="card">
   
    <div class="card-header">
      <div>
        <i class="fa fa-align-justify"></i> 
          {{user_translate.detailsUsers}}
           <!-- <div style="padding-left:70%;padding-top:0%"> -->
           <button  v-show=" !toAdd && !toEdit && !toConsult" class=" btn btn-primary " @click="addNewUser()" style="float: right"> {{user_translate.addUser}} </button>
           <!-- </div> -->
      </div>
    </div>
    <b-card-body class="p-2">
  <!-- FirstName -->
      <b-input-group class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text><a class="pointer" data-toggle="tooltip" data-placement="top" :title="user_translate.firstName"><i class="icon-user"></i></a></b-input-group-text>
          </b-input-group-prepend>
          <input type="text" :disabled="!toAdd && !toEdit" :placeholder="user_translate.firstName" v-model="userForm.firstName" class="form-control" :class="{ 'has-error': errors.has('firstName') }" name="firstName" v-validate="'required|min:3'" >
           </b-input-group>
           <b-input-group class="mb-3">
           <span class="danger"  v-show="errors.has('firstName')" >
                {{ errors.first('firstName') }} 
            </span>
      </b-input-group>
  <!-- lastName -->
      <b-input-group class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text><a class="pointer" data-toggle="tooltip" data-placement="top" :title="user_translate.lastName"><i class="icon-user"></i></a></b-input-group-text>
          </b-input-group-prepend>
          <input type="text" :disabled=" (!toAdd && !toEdit)"  :placeholder="user_translate.lastName" v-model="userForm.lastName" class="form-control" :class="{ 'has-error': errors.has('lastName') }" name="lastName" v-validate="'required|min:3'">
          </b-input-group>
          <b-input-group class="mb-3">
          <span class="danger"  v-show="errors.has('lastName')" >
                {{ errors.first('lastName') }} 
          </span>
      </b-input-group>
  <!-- Email -->
      <b-input-group class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text><a class="pointer" data-toggle="tooltip" data-placement="top" :title="user_translate.internalEmail"><i class="icon-envelope"></i></a></b-input-group-text>
          </b-input-group-prepend>
          <input type="text" autocomplete="new-mail" :disabled="!toAdd && !toEdit" :placeholder="user_translate.internalEmail" v-model="userForm.internalEmail" class="form-control" :class="{ 'has-error': errors.has('internalEmail') }" name="internalEmail" v-validate="'required|email'">
          </b-input-group>
          <b-input-group class="mb-3">
          <span class="danger"  v-show="errors.has('internalEmail')" >
                {{ errors.first('internalEmail') }} 
          </span>
      </b-input-group>
  <!-- Login -->
      <b-input-group class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text><a class="pointer" data-toggle="tooltip" data-placement="top" :title="user_translate.login"><i class="icon-user"></i></a></b-input-group-text>
          </b-input-group-prepend>
          <input type="text" autocomplete="new-password" :disabled="!toAdd && !toEdit" :placeholder="user_translate.login" v-model="userForm.login" class="form-control" :class="{ 'has-error': errors.has('login') }" name="login" v-validate="'required|min:3'">
          </b-input-group>
          <b-input-group class="mb-3">
          <span class="danger"  v-show="errors.has('login')" >
                {{ errors.first('login') }} 
          </span>
           <span class="danger"  v-show="errorLogin" >
                {{ user_translate.errorLogin }} 
          </span>
      </b-input-group>
  <!-- password -->
      <b-input-group class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text><a class="pointer" data-toggle="tooltip" data-placement="top" :title="user_translate.password"><i class="icon-key"></i></a></b-input-group-text>
          </b-input-group-prepend>
          <input type="password" autocomplete="new-password" :disabled="!toAdd && !toEdit" :placeholder="user_translate.password" v-model="userForm.passWord" class="form-control" :class="{ 'has-error': errors.has('password') }" name="password" v-validate="'required|min:3'">
           </b-input-group>
           <b-input-group class="mb-3">
            <span class="danger" v-show="errors.has('password')" >
                {{ errors.first('password') }} 
            </span>
      </b-input-group>
  <!-- creation Date -->
      <b-input-group class="mb-3">
          <b-input-group-prepend>
            <b-input-group-text><a class="pointer" data-toggle="tooltip" data-placement="top" :title="user_translate.creationDate"><i class="icon-calendar"></i></a></b-input-group-text>
          </b-input-group-prepend>
          <input type="date" disabled="false" class="form-control" :placeholder="user_translate.creationDate" v-model="userForm.creationDate" name="dateCreation" v-validate="'required'">
       </b-input-group>
  <!-- Department -->
      
        <b-input-group class="mb-3">
        
           <multiselect v-model="userForm.departements"  tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="departementDesignation" value ="departementDesignation" track-by="id" :options="getAllDepartments" :multiple="true" :taggable="true" @tag="addTag" v-validate="'required'" name="multi" ></multiselect>
       </b-input-group>
      
  <!-- State -->
      <b-form-group
            :label="user_translate.activation"
            label-for="basicCustomRadios1"
            :label-cols="2"
            :horizontal="true"> 
            <b-form-radio-group
              id="basicCustomRadios1"
              name="customRadioInline1">
              <div class="custom-control custom-radio custom-control-inline">
                <input :disabled="!toAdd && !toEdit"  type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" value="true" v-model="userForm.activated">
                <label class="custom-control-label" for="customRadioInline1">{{user_translate.yes}}</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input :disabled="!toAdd && !toEdit"  type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" value="false" checked v-model="userForm.activated">
                <label class="custom-control-label" for="customRadioInline2">{{user_translate.no}}</label>
              </div>
             
            </b-form-radio-group>
      </b-form-group>
              
                 <div style=" float: right; display: inline-flex;" >
                    <b-button  class="btn-success" v-if="toEdit"  :disabled="errors.any() || !isComplete || !modif " @click="addUser(userForm)">{{user_translate.submitButton}}</b-button>
                    <b-button  class="btn-success" v-if="toAdd  "  :disabled="errors.any() || !isComplete || !ajout " @click="addUser(userForm)">{{user_translate.submitButton}} </b-button>
                    <b-button  class="btn-danger"  v-if=" toAdd || toConsult || toEdit"  @click="undo()">{{user_translate.cancelButton}}</b-button>
                 </div>
            </b-card-body>
            <notifications group="foo" />
      </div>
    </div>
  <!-- end partie Add -->
</div>
</template>

<script>
import Vue from 'vue'
import Notifications from 'vue-notification'
import powerService from '@/services/power/powerService'
import decode from 'jwt-decode';

Vue.use(Notifications)

export default {
  component: {
    name: 'listuser',
  },
 
  data () {
    var vm = this
    return {
      value:[],
      decoded:'',
      ajout:'',
      supp:'',
      modif:'',
      conslt:'',
      users : [],
      showModal: false,
      dangerModal: false,
      toConsult: false,
      toAdd: false,
      toEdit: false,
      user : null,
      errorLogin : false,
      departments: [],
      userForm: {
        firstName:null,
        lastName:null,
        login:null,
        passWord:null,
        internalEmail : null,
        creationDate:null,
        activated: false,
        department: {
          id: null,
          departementDesignation: null,
          codeDepartement : null
        },
      }, 
    }
  },
  created(){
       var vm = this;
       vm.users = vm.$store.dispatch('getAllUsers')
       vm.departments = vm.$store.dispatch('getDepartments')
       this.decoded=decode(window.localStorage.getItem("token"));
       for(var i=0;i<this.decoded.roles.length;i++){
          powerService.getPowerByRoleAndMenu(this.decoded.roles[i].authority,"listuser").then((response) => {
             if(response.data.length !=0){
                if(response.data.flagCreation == true){
                  vm.ajout=true;
                }
                if(response.data.flagSupression == true){
                  vm.supp=true;
                }
                if(response.data.flagModification == true){
                  vm.modif=true;
                }
                if(response.data.flagConsultation == true){
                  vm.conslt=true;
                }
                if(response.data.flagCreation == false){
                  vm.ajout=false;
                }
                if(response.data.flagSupression == false){
                  vm.supp=false;
                }
                if(response.data.flagModification == false){
                  vm.modif=false;
                }
                if(response.data.flagConsultation == false){
                  vm.conslt=false;
                }
              }
           })
        }
  },
   computed:{
     user_translate() {
			return this.translate('user_translate')
    },
    pagination_translate() {
        return this.translate('pagination_translate')
    },
    getAllUsers(){
      return this.$store.getters.getAllUsers
    },
    getAllDepartments(){
      return this.$store.getters.getDepartments
    },
    isComplete(){
      return this.userForm.login && this.userForm.passWord;
    },
  },
   methods: {
      popUp(u){
        var vm = this;
        vm.dangerModal = true;
        vm.user = u;
      },
      addNewUser(){
        var vm = this;
        vm.toAdd = true;
        vm.toEdit= false;
        vm.toConsult = true;
        this.initForm()
        this.userForm.creationDate =new Date().toISOString().slice(0, 10)
      },
      getUsers(){
        var vm = this;
        vm.$store.dispatch('getAllUsers')
      },
    deleteUser(){
      var vm = this;
       vm.$store.dispatch('deleteUser',vm.user.id) 
       //Notification ***
            if(this.language == "fr"){
                this.$awn.success("L'utilisateur " +vm.user.firstName +" "+vm.user.lastName + " a été supprimé avec succès.")
            } else{
               this.$awn.success("The user " +vm.user.firstName +" "+vm.user.lastName+ " has been successfully removed.")
            }
        //***** 
    },
    consultUser(user){
      var vm = this;
      vm.toAdd = false;
      vm.toEdit= false;
      vm.toConsult = true;
      vm.userForm = Object.assign({}, user); 
    },
    updateUser(user){
      var vm = this;
      vm.toAdd = false;
      vm.toEdit= true;
      vm.toConsult = false;
      vm.userForm = Object.assign({}, user);
    },
    addUser(userForm){
      var vm = this;
          if(vm.toAdd === true){
              if( this.validateLogin(userForm)){
                  userForm.creationDate = new Date().toISOString().slice(0, 10);
                  console.log(userForm)
                  vm.$store.dispatch('addUser',userForm)
                  //Notification ***
                  if(this.language == "fr"){
                      this.$awn.success("L'utilisateur " +userForm.firstName + " a été ajouté avec succès.")
                  } else{
                      this.$awn.success("The user " +userForm.firstName + " has been successfully added.")
                  }
                 //***** 
                  this.initForm()
                  this.toAdd = false;
                  this.toEdit= false;
                  this.toConsult = false;
                 
              }
          //update user
          }else{
                if( this.validateLogin(userForm)){
                    vm.$store.dispatch('updateUser',userForm)
                    console.log(userForm)
                    //Notification ***
                    if(this.language == "fr"){
                        this.$awn.success("L'utilisateur " +userForm.firstName + " a été modifié avec succès.")
                    } else{
                        this.$awn.success("The user " +userForm.firstName + " has been successfully modified.")
                    }
                    //***** 
                    this.initForm()
                    this.toAdd = false;
                    this.toEdit= false;
                    this.toConsult = false;
              }
          }
          
      
    },
    validateLogin(userForm){
      let vm = this
      let result = true;
      this.getAllUsers.forEach(function(user) {
        if(user.login == userForm.login && user.id != userForm.id){
          vm.errorLogin = true;
          result = false;
        }
      });
      return result;
    },
    validate() {
       this.$validator.validateAll()
       return this.errors.any()
    },
    undo(){
          this.toAdd = false;
          this.toEdit= false;
          this.toConsult = false;
          this.initForm();
    },
    initForm(){
      this.userForm ={
        firstName:null,
        lastName:null,
        login:null,
        passWord:null,
        internalEmail: null,
        creationDate:null,
        activated: false
      };
      this.errorLogin = false;
      this.$validator.reset();
    }
  }
}
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
    .pointer {cursor: pointer;}
    ::-webkit-inner-spin-button { display: none; }
     input[type="date"]::-webkit-calendar-picker-indicator {
        background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/80% no-repeat;
        color: rgba(0, 0, 0, 0);
        opacity: 0.5
    }
    input[type="date"]::-webkit-calendar-picker-indicator:hover {
        background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/80% no-repeat;
        opacity: 0.8
    }
     .isDisabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}


  
.multiselect__tag {
  background-color: yellow;
}

.multiselect__option--disabled{
  background: purple;
  color: white;
  font-style: italic;
}

.multiselect__option--highlight {
  background: #bfbfbf;
}

.multiselect__content {
   background: red;
}

    
  
    
    
    /* .pagination {
      position: relative;
      left: 110px;
    } */
</style>