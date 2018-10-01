<template>
<div class="row">
<div class="col-sm-12 col-md-12">
<div>
  <div class="card-header">
  <div>
    Recherche
 </div>
  </div>
       <b-card-body class="card">
        <b-row>
            <b-col sm="4">
              <b-form-group>
                <label>Sourceur </label>
                 <b-form-select v-model="sourceur.idUser">
                   <option :value="null">-- Sélectionner --</option>
                    <option v-for="sourceur in ListReportingSourceur" v-bind:value="sourceur.idUser">{{sourceur.nomSourceur}}</option>
              </b-form-select> 
              </b-form-group>
              
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label>Date debut</label>
                <b-form-input  type="text"  placeholder="Date debut"></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="4">
              <b-form-group>
                <label>Date fin</label>
                <b-form-input  type="text"  placeholder="Date fin"></b-form-input>
              </b-form-group>
            </b-col>
             

        </b-row>
             <div>
    <b-button  @click="rechercherNouveauxCandidats()"  variant="info">Rechercher</b-button> 
    <b-button  @click="getListSourceur()"  variant="info">Annuler</b-button> 
  </div>
      </b-card-body>
</div>

<div class="row">
<div class="col-sm-6 col-md-6">
  <div class="card">
<canvas id="pieChart" width="200" height="120"></canvas>
 <!--<b-button  @click="getChart1()"  variant="info"></b-button> -->
  </div>
  </div> 

<div class="col-sm-6 col-md-6">
<div class="card">
<canvas id="myChart" width="200" height="120"></canvas>
 
  </div>
</div>
</div>

<div class="card">
  <div class="card-header">
  <div>
  <i class="fa fa-align-justify"></i> 
  Reporting sourceur  
 </div>
  </div>

   <vue-good-table
          :columns= "
          [
             {
          label: 'Sourceur',
          field: 'nomSourceur',
          tdClass: 'text-center',
        },
            {
          label: 'Totale',
          field: 'nbrTotal',
          tdClass: 'text-center',
        },
         {
          label: 'CV disponibles',
          field: 'nbrDsipo',
          tdClass: 'text-center',

        },
        {
          label: 'Hors cible',
          field: 'nbrHors',
          tdClass: 'text-center',

        },
        {
          label: 'Taux de satisfaction',
          field: 'taux',
          tdClass: 'text-center',

        }

          ]"

          :rows="ListReporting"
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
              <span v-if="props.column.field  == 'nomSourceur'">
               {{props.row.nomSourceur}}
              </span>
               <span v-if="props.column.field  == 'nbrTotal'">
               {{props.row.nbrTotal}}
              </span>
               <span v-if="props.column.field  == 'nbrDsipo'">
               {{props.row.nbrDsipo}}
              </span>
              <span v-if="props.column.field  == 'nbrHors'">
               {{props.row.nbrHors}}
              </span>
              <span v-if="props.column.field  == 'taux'">
               {{props.row.taux}}
              </span>
            </template>
             <div slot="emptystate">
                Pas des données pour la table
            </div>
       </vue-good-table>
</div>
<notifications group="foo" />
</div>

</div>

</template>
<script>
 import reportingSourceurService from '@/services/ReportingSourceurService/reportingSourceurService'
 import cSwitch from '@/components/Switch'
 import Chart from 'chart.js';
 import TechnologieService from '@/services/administrationService/TechnologieService'
 //import { pieChart } from 'vue-chartjs'
export default {
  components :{
    cSwitch,
    Chart
  },
  data () {
    return {
        ListReportingSourceur : [],
        ListReporting : [],
        sourceur :{
            idUser : null,
            nomSourceur : null
        },
        dateDebut : null,
        dateFin : null,
        autresCv : null,
        totalCVDisponible : null,
        totalCVhorsCible : null,
        lib: [],
        test: [],
        dataPieChart : []
    }
  },
  computed: {
    RDVLangue() {
        return this.translate('RDVLangue')
      }
    },
     created(){
    var vm = this;
     vm.autresCv = 0;
     vm.totalCVDisponible = 0;
     vm.totalCVhorsCible = 0;
    reportingSourceurService.getListSourceur().then(function(response) {
            vm.ListReportingSourceur = response.data;
          }),
    reportingSourceurService.getListReporting().then(function(response) {
            vm.ListReporting = response.data;
                    for( vm.i=0; vm.i<vm.ListReporting.length; vm.i++)
                {      
                    vm.autresCv = vm.autresCv + vm.ListReporting[vm.i].autre,
                    vm.totalCVDisponible = vm.totalCVDisponible + vm.ListReporting[vm.i].nbrDsipo,
                    vm.totalCVhorsCible = vm.totalCVhorsCible + vm.ListReporting[vm.i].nbrHors
                }
  new Chart(document.getElementById("pieChart"), {
    type: 'pie',
    data: {
      labels: ["Autres", "CV disponibles", "CV hors cible"],
      datasets: [
        {
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: [vm.autresCv, vm.totalCVDisponible, vm.totalCVhorsCible]
        }
      ]
       }
      });
    
          }),
    vm.getChart2()
  
  },


  methods: {
    getListSourceur(){
        var vm = this;
     vm.autresCv = 0;
     vm.totalCVDisponible = 0;
     vm.totalCVhorsCible = 0;
    reportingSourceurService.getListReporting().then(function(response) {
            vm.ListReporting = response.data;
                    for( vm.i=0; vm.i<vm.ListReporting.length; vm.i++)
                {      
                    vm.autresCv = vm.autresCv + vm.ListReporting[vm.i].autre,
                    vm.totalCVDisponible = vm.totalCVDisponible + vm.ListReporting[vm.i].nbrDsipo,
                    vm.totalCVhorsCible = vm.totalCVhorsCible + vm.ListReporting[vm.i].nbrHors
                }
  new Chart(document.getElementById("pieChart"), {
    type: 'pie',
    data: {
      labels: ["Autres", "CV disponibles", "CV hors cible"],
      datasets: [
        {
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: [vm.autresCv, vm.totalCVDisponible, vm.totalCVhorsCible]
        }
      ]
       }
      });
    
          }),
      vm.getChart2()
      },
   
      rechercherNouveauxCandidats(){
     var vm = this;
     vm.autresCv = 0;
     vm.totalCVDisponible = 0;
     vm.totalCVhorsCible = 0;
    reportingSourceurService.rechercherReportingSourceur(vm.sourceur,vm.dateDebut,vm.dateFin).then(function(response) {
            vm.ListReporting = response.data;
                              for( vm.i=0; vm.i<vm.ListReporting.length; vm.i++)
                {      
                    vm.autresCv = vm.autresCv + vm.ListReporting[vm.i].autre,
                    vm.totalCVDisponible = vm.totalCVDisponible + vm.ListReporting[vm.i].nbrDsipo,
                    vm.totalCVhorsCible = vm.totalCVhorsCible + vm.ListReporting[vm.i].nbrHors
                }
  new Chart(document.getElementById("pieChart"), {
    type: 'pie',
    data: {
      labels: ["Autres", "CV disponibles", "CV hors cible"],
      datasets: [
        {
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: [vm.autresCv, vm.totalCVDisponible, vm.totalCVhorsCible]
        }
      ]
       }
      });
             }),
         
     reportingSourceurService.recherchemapTechnologieParSourceur(vm.sourceur,vm.dateDebut,vm.dateFin).then(function(result) {
    if (result.status == 200) {
    if(result.data){
    //console.log(result.data);
    //console.log(Object.values(result.data));
    vm.dataPieChart = Object.values(result.data)
//var ctx = document.getElementById("myChart").getContext('2d');
 new Chart(document.getElementById("myChart"), {
    type: 'pie',
    data: {
        labels: vm.lib,
        datasets: [{
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e67e22","#d35400"],
          data: vm.dataPieChart
        }]
    }
      });
            }
            }
          }
          )
      },
          
    getChart1() {
     var vm = this;
     vm.autresCv = 0;
     vm.totalCVDisponible = 0;
     vm.totalCVhorsCible = 0;
		 

                  //var ctx = document.getElementById('pieChart');
                    for( vm.i=0; vm.i<vm.ListReporting.length; vm.i++)
                {      
                    vm.autresCv = vm.autresCv + vm.ListReporting[vm.i].autre,
                    vm.totalCVDisponible = vm.totalCVDisponible + vm.ListReporting[vm.i].nbrDsipo,
                    vm.totalCVhorsCible = vm.totalCVhorsCible + vm.ListReporting[vm.i].nbrHors
                     
                 
                }
//var myChart = new Chart(ctx, {
  new Chart(document.getElementById("pieChart"), {
  
    type: 'pie',
    data: {
      labels: ["Autres", "CV disponibles", "CV hors cible"],
      datasets: [
        {
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: [vm.autresCv, vm.totalCVDisponible, vm.totalCVhorsCible]
        }
      ]
       }
  /*options: {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Chart.js Doughnut Chart'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
        	var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
          return precentage + "%";
        }
      }
    }
  }*/
      });
    },

getChart2() {
       var vm = this;
     TechnologieService.getTechnologiesByLibelle().then(function(response) {
            vm.test = response.data
           for (var i=0 ; i<vm.test.length ; i++) {
             vm.lib.push(vm.test[i].libelle)

           }
          }),
     reportingSourceurService.getChart3().then(function(result) {
    if (result.status == 200) {
    if(result.data){
    //console.log(result.data);
    //console.log(Object.values(result.data));
    vm.dataPieChart = Object.values(result.data)
//var ctx = document.getElementById("myChart").getContext('2d');
 new Chart(document.getElementById("myChart"), {
    type: 'pie',
    data: {
        labels: vm.lib,
        datasets: [{
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e67e22","#d35400"],
          data: vm.dataPieChart
        }]
    }
      });
            }
            }
          }
          )
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
.star{
  color: red;
  font-weight: bold;
}
</style>
