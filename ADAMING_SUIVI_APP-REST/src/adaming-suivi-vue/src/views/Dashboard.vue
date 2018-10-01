<template>
<b-card bg-variant="#FFFFFF">
<div class="panel-body">
<div class="container-fluid">
  <div class="card">
<div class="row">
<div class="col-sm-6 col-md-6">
  <div class="card">
    <b-row class="justify-content-md-center">
    <label style="font-weight:bold;color:#546E7A;ce">CV en attente de traitement</label>
    </b-row>
<canvas id="line-chart-agency" width="200" height="130"></canvas>
  </div>
</div> 
<div class="col-sm-6 col-md-6">
  <div class="card">
    <b-row class="justify-content-md-center">
    <label style="font-weight:bold;color:#546E7A;ce">Nombre de CV à relancer par chargé de recrutement
    </label>
    </b-row>
  <vue-good-table
          :columns= "
          [
        {
          label: 'Chargé recrutement',
          field: 'nomCharge',
          tdClass: 'text-center',
        },
        {
          label: 'Nombre CV à relancer',
          field: 'nombreCvRelance',
          tdClass: 'text-center',
        },
         {
          label: 'Action',
          field: 'idUser',
          tdClass: 'text-center',
          type: 'number',
       
        }
        ]"

          :rows="ReportingChargeRelance"
          :sort-options="{
            enabled: true,
            initialSortBy: {field: 'dateTache', type: 'desc'}
          }"
          :pagination-options="{
            enabled: true,
            perPage: 5,
            perPageDropdown: [5],
            nextLabel: 'Suiv',
            prevLabel: 'Préc',
            ofLabel: '/',
            allLabel: 'Tout',
            rowsPerPageLabel: 'Lignes par page',
          }"
          styleClass="vgt-table  bordered vgt-center-align">

            <template slot="table-row" slot-scope="props" >
              <span v-if="props.column.field  == 'nomCharge'">
               {{props.row.nomCharge}}
              </span>
              <span v-if="props.column.field  == 'nombreCvRelance'">
               {{props.row.nombreCvRelance}}
              </span>
               <span v-if="props.column.field  == 'idUser'">
                <router-link :to="'/ficheCVRelance/'+props.row.idUser">
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
<div class="row">
  
<div class="col-sm-6 col-md-6">
  <div class="card">
    <b-row class="justify-content-md-center">
    <label style="font-weight:bold;color:#546E7A;ce">Sessions de formation</label>
    </b-row>
  <vue-good-table
          :columns= "
          [
        {
          label: 'Nom de la formation	',
          field: 'nom_Formation',
          tdClass: 'text-center',
        },
        {
          label: 'Lieu de la formation	',
          field: 'lieu_Formation',
          tdClass: 'text-center',
        },
        {
          label: 'Type de formation	',
          field: 'type_Formation',
          tdClass: 'text-center',
        },
        {
          label: 'Date Démarrage	',
          field: 'date_demarrage',
          tdClass: 'text-center',
        },
        {
          label: 'Candidat validé par C.R.',
          field: 'candidat_affectation',
          tdClass: 'text-center',
        },
        {
          label: 'Candidat ayant accepté la formation',
          field: 'candidat_acceptation',
          tdClass: 'text-center',
        },
        {
          label: 'Nombre de place',
          field: 'nombre_place',
          tdClass: 'text-center',
        },
        {
          label: 'Taux acceptation',
          field: 'taux_acceptation',
          tdClass: 'text-center',
        },
          {
          label: 'Taux de remplissage',
          field: 'taux_remplissage',
          tdClass: 'text-center',
        },
         {
          label: 'Action',
          field: 'idSession',
          tdClass: 'text-center',
          type: 'number',
       
        }
        ]"

          :rows="Sessionreporting"
          :sort-options="{
            enabled: true,
            initialSortBy: {field: 'dateTache', type: 'desc'}
          }"
          :pagination-options="{
            enabled: true,
            perPage: 5,
            perPageDropdown: [5],
            nextLabel: 'Suiv',
            prevLabel: 'Préc',
            ofLabel: '/',
            allLabel: 'Tout',
            rowsPerPageLabel: 'Lignes par page',
          }"
          styleClass="vgt-table  bordered vgt-center-align">

            <template slot="table-row" slot-scope="props" >
              <span v-if="props.column.field  == 'nom_Formation'">
               {{props.row.nom_Formation}}
              </span>
              <span v-if="props.column.field  == 'lieu_Formation'">
               {{props.row.lieu_Formation}}
              </span>
               <span v-if="props.column.field  == 'type_Formation'">
               {{props.row.type_Formation}}
              </span>
               <span v-if="props.column.field  == 'date_demarrage'">
               {{props.row.date_demarrage}}
              </span>
               <span v-if="props.column.field  == 'candidat_affectation'">
               {{props.row.candidat_affectation}}
              </span>
               <span v-if="props.column.field  == 'candidat_acceptation'">
               {{props.row.candidat_acceptation}}
              </span>
               <span v-if="props.column.field  == 'nombre_place'">
               {{props.row.nombre_place}}
              </span>
               <span v-if="props.column.field  == 'taux_acceptation'">
               {{props.row.taux_acceptation}}
              </span>
               <span v-if="props.column.field  == 'taux_remplissage'">
               {{props.row.taux_remplissage}}
              </span>
               <span v-if="props.column.field  == 'idSession'">
                <router-link :to="'/ficheCandidatSession/'+props.row.idSession">
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
<div class="col-sm-6 col-md-6">
  <div class="card">
     <b-row class="justify-content-md-center">
    <label style="font-weight:bold;color:#546E7A;ce">Nombre de CV intégrés au niveau de l'application</label>
    </b-row>
  <vue-good-table
          :columns= "
          [
        {
          label: 'Sourceur',
          field: 'nom',
          tdClass: 'text-center',
        },
        {
          label: 'Mainframe',
          field: 'nbrCvMainframe',
          tdClass: 'text-center',
        },
        {
          label: 'Mainframe++',
          field: 'nbrCvMainframePlus',
          tdClass: 'text-center',
        },
        {
          label: 'NTIC',
          field: 'nbrCvNtic',
          tdClass: 'text-center',
        },
        {
          label: 'Autres technologies',
          field: 'autreTechnologie',
          tdClass: 'text-center',
        },
        {
          label: 'TOTAL',
          field: 'total',
          tdClass: 'text-center',
        }
        ]"

          :rows="SourceurTechnologies"
          :sort-options="{
            enabled: true,
            initialSortBy: {field: 'dateTache', type: 'desc'}
          }"
          :pagination-options="{
            enabled: true,
            perPage: 5,
            perPageDropdown: [5],
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
              <span v-if="props.column.field  == 'nbrCvMainframe'">
               {{props.row.nbrCvMainframe}}
              </span>
              <span v-if="props.column.field  == 'nbrCvMainframePlus'">
               {{props.row.nbrCvMainframePlus}}
              </span>
              <span v-if="props.column.field  == 'nbrCvNtic'">
               {{props.row.nbrCvNtic}}
              </span>
              <span v-if="props.column.field  == 'autreTechnologie'">
               {{props.row.autreTechnologie}}
              </span>
              <span v-if="props.column.field  == 'total'">
               {{props.row.total}}
              </span>
            </template>
             <div slot="emptystate">
                Pas des données pour la table
            </div>
        
       </vue-good-table>
  </div>
</div>
  </div>
</div>
</div>
</div>
</b-card>
</template>
<script>
 import cSwitch from '@/components/Switch'
import accueilService from '@/services/AccueilService/accueilService'
import TechnologieService from '@/services/administrationService/TechnologieService'
import Chart from 'chart.js';
export default {
  components :{
    cSwitch,
    Chart
  },
  data () {
    return {
    dataPieChart : [],
    test: [],
    lib: [],
    ReportingChargeRelance : [],
    Sessionreporting : [],
    SourceurTechnologies : []
    }
  },
  computed: {
    RDVLangue() {
        return this.translate('RDVLangue')
      }
    },
   
  created(){
    var vm = this;
     accueilService.getNombreCVRrelancer().then(function(response) {
            vm.ReportingChargeRelance = response.data;
          }),
      accueilService.getSessionreporting().then(function(response) {
            vm.Sessionreporting = response.data;
          }),
      accueilService.getSourceurTechnologies().then(function(response) {
            vm.SourceurTechnologies = response.data;
          }),
    
    vm.getChart();
  },

  methods: {
    getChart() {
     var vm = this;
     TechnologieService.getTechnologiesByLibelle().then(function(response) {
            vm.test = response.data
           for (var i=0 ; i<vm.test.length ; i++) {
             vm.lib.push(vm.test[i].libelle)

           }
          }),
          
    accueilService.getChart().then(function(result) {
    if (result.status == 200) {
    if(result.data){
    vm.dataPieChart = Object.values(result.data)
                new Chart(document.getElementById("line-chart-agency"), {
    type: 'pie',
    data: {
      labels: vm.lib,
      datasets: [
        {
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e67e22","#d35400"],
          data: vm.dataPieChart
        }
      ]
       }
      });
         }
            }
              })
    }
  }
}
</script>
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


