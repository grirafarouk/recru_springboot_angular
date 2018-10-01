<template>
<div class="row">
<div class="col-sm-12 col-md-12">
<div>
  <div class="card-header">
  <div>
    Informations
 </div>
  </div>
       <b-card-body class="card"  :style="{'direction' : rtl}">
           <b-row>
            <b-col sm="3">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Nom Formation: </label>
                  <b-form-input  type="text" v-model="session.formation.nom" disabled=true></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Technologie: </label>
                  <b-form-input  type="text" v-model="session.formation.technologie.libelle" disabled=true></b-form-input>
              </b-form-group>
            </b-col>
              <b-col sm="3">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Lieu: </label>
              <b-form-input  type="text" v-model="session.formation.lieu.libelle" disabled=true></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Type de formation: </label>
                 <b-form-input  type="text" v-model="session.formation.typeFormation.libelle" disabled=true></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Date démarage: </label>
                  <b-form-input  type="text" v-model="timeStampToDate(session.dateDemarrage).ddmmyyyy" disabled=true></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Date fin: </label>
                  <b-form-input  type="text" v-model="timeStampToDate(session.dateFin).ddmmyyyy" disabled=true></b-form-input>
              </b-form-group>
            </b-col>
              <b-col sm="3">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Nombre Candidats: </label>
              <b-form-input  type="text" v-model="session.nombrePlace" disabled=true></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="3">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Nombre Place : </label>
                 <b-form-input  type="text" v-model="session.nombrePlace" disabled=true></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
      </b-card-body>
</div>
<div class="card"  :style="{'direction' : rtl}" >
  <div class="card-header">
  <div>
  <i class="fa fa-align-justify"></i> 
Liste Candidats
 </div>

  </div>

   <vue-good-table
          :columns= "
          [
        {
          label: 'Nom',
          field: 'nom',
          tdClass: 'text-center',
         
        },
         {
          label: 'Prénom',
          field: 'prenom',
          tdClass: 'text-center',
        
        },
        {
          label: 'N° Téléphone',
          field: 'numeroTel',
          tdClass: 'text-center',
         
        },
        {
          label: 'Email',
          field: 'email',
          tdClass: 'text-center',
         
        },
        {
          label: 'Nom sourceur',
          field: 'nom',
          tdClass: 'text-center',
         
        },
        {
          label: 'Prénom sourceur',
          field: 'prenom',
          tdClass: 'text-center',
        
        },
         {
          label: 'Action',
          field: 'id',
          tdClass: 'text-center',
          type: 'number',
       
        }]"

          :rows="candidats"
          styleClass="vgt-table  bordered vgt-center-align">

            <template slot="table-row" slot-scope="props" >
              <span v-if="props.column.field  == 'nom'">
               {{props.row.nom}}
              </span>
               <span v-if="props.column.field  == 'prenom'">
               {{props.row.prenom}}
              </span>
               <span v-if="props.column.field  == 'numeroTel'">
               {{props.row.numeroTel}}
              </span>
               <span v-if="props.column.field  == 'email'">
               {{props.row.email}}
              </span>
              <span v-if="props.column.field  == 'nom'">
               {{props.row.creePar.nom}}
              </span>
                <span v-if="props.column.field  == 'prenom'">
               {{props.row.creePar.prenom}}
              </span>
              <span v-if="props.column.field  == 'id'">
                <router-link :to="/fiche-entretien/+ props.row.id">
                    <i  class="material-icons text-primary cursor" title="Voir fiche">visibility</i>
                </router-link>
              </span>
            </template>
             <div slot="emptystate">
                Pas des données pour la table
            </div>
       </vue-good-table>
      

    
      
</div>
</div>
</div>
</template>
<script>

 import cSwitch from '@/components/Switch'
 import SessionService from "@/services/sessionService/SessionService";
 import moment from 'moment';
export default {
  components :{
    cSwitch
  },
  data () {
    return {
      session : null,
      candidats : []
    }
  },
  computed: {
    RDVLangue() {
        return this.translate('RDVLangue')
      }
    },
  mounted(){
      var vm = this;
      vm.getcandidatBySession(vm.$route.params.id),
       SessionService.getCandidatBySession(vm.$route.params.id).then(
          function(response) {
            vm.candidats = response.data;

          }
        ) 
        },

  methods: {
 getcandidatBySession(id){
        var vm = this
        SessionService.getSessionByID(id).then(
          function(response) {
            vm.session = response.data;

          }
        )
       

    },
      timeStampToDate(timestamp) {
      const date = moment(timestamp)
      return {
        ddmmyyyy: date.format('DD/MM/YYYY')
      }
    }
  }
}
</script>


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
.star{
  color: red;
  font-weight: bold;
}
.pagination a {
    margin: 0 4px; /* 0 is for top and bottom. Feel free to change it */
}

a {
  color: #999;
}
.current {
  color: red;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  display: inline;
  margin: 5px 5px;
}

a.first:after {
  content:'...'
}

a.last:before {
  content:'...'
}
</style>
