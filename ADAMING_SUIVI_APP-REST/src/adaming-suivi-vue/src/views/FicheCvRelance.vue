<template>
<div class="row">
  <!--Liste des Rendez-vous-->

<div class="col-sm-12 col-md-12">
<div class="card"  :style="{'direction' : rtl}" >
  <div class="card-header">
  
  </div>

   <vue-good-table
          :columns= "
          [
        {
          label: 'nom',
          field: 'nom',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
          
        },
          {
          label: 'Prénom',
          field: 'prenom',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
          
        },
         {
          label: 'Numéro de Téléphone',
          field: 'numero',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
          
        },
         {
          label: 'Email',
          field: 'email',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
          
        },
        {
          label: 'Date relance',
          field: 'date',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
          
        },
         {
          label: 'Technologie',
          field: 'technologie',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
          
        }
        ]"

          :rows="CVRelance"
          :sort-options="{
            enabled: true,
            initialSortBy: {field: 'dateTache', type: 'desc'}
          }"
          :pagination-options="{
            enabled: true,
            perPageDropdown: [5, 10, 20],
            nextLabel: 'Suiv',
            prevLabel: 'Préc',
            ofLabel: '/',
            allLabel: 'Tout',
            rowsPerPageLabel: 'Lignes par page',
          }"
          styleClass="vgt-table  bordered vgt-center-align">

            <template slot="table-row" slot-scope="props" >
              <span v-if="props.column.field  == 'nom'">
               {{props.row.nom}}
              </span>
               <span v-if="props.column.field  == 'prenom'">
               {{props.row.prenom}}
              </span>
               <span v-if="props.column.field  == 'numero'">
               {{props.row.numero}}
              </span>
               <span v-if="props.column.field  == 'email'">
               {{props.row.email}}
              </span>
               <span v-if="props.column.field  == 'date'">
               {{props.row.date}}
              </span>
              <span v-if="props.column.field  == 'technologie'">
               {{props.row.technologie}}
              </span>
            </template>
             <div slot="emptystate">
                Pas des données pour la table
            </div>
        
       </vue-good-table>

 <span>
     <router-link to="/accueil" class="right">
      <b-button variant="info" class="pull-right">Retourner</b-button> 
   </router-link>
  </span>
</div>
<notifications group="foo" />
</div>
</div>
</template>

<script>
 
 import CompetenceService from '@/services/AccueilService/FicheCvRelance'
 import cSwitch from '@/components/Switch'
export default {
  components :{
    cSwitch
  },
  data () {
    return {
        CVRelance:[],
    }
  },
  computed: {
    RDVLangue() {
        return this.translate('RDVLangue')
      }
    },
   
    mounted(){
    var vm = this;
    vm.getcandidatByCharge(vm.$route.params.idUser)
  },

  methods: {
getcandidatByCharge(chargeId){
        var vm = this
        CompetenceService.getCVRelanceByCharge(chargeId).then(
          function(response) {
            vm.CVRelance = response.data;

          }
        ) 
    },
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
.star{
  color: red;
  font-weight: bold;
}
</style>
