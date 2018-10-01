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
          label: 'Nom sourceur',
          field: 'nomsourceur',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
        },
         {
          label: 'Prenom sourceur',
          field: 'prenomsourceur',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
        },
         {
          label: 'Nom charge',
          field: 'nomcharge',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
        },
         {
          label: 'Prenom charge',
          field: 'prenomcharge',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          }
        }

        ]"

          :rows="CandidatSession"
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
               <span v-if="props.column.field  == 'nomsourceur'">
               {{props.row.nomsourceur}}
              </span>
              <span v-if="props.column.field  == 'prenomsourceur'">
               {{props.row.prenomsourceur}}
              </span>
              <span v-if="props.column.field  == 'nomcharge'">
               {{props.row.nomcharge}}
              </span>
              <span v-if="props.column.field  == 'prenomcharge'">
               {{props.row.prenomcharge}}
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
   <b-button class="btn btn-sm" @click="ExportExcel()">
      <img src="../assets/excel-icon.png" width="60%">
    </b-button>
  </span>
</div>
<notifications group="foo" />
</div>
</div>
</template>

<script>
 
 import CandidatSessionService from '@/services/AccueilService/FicheCvRelance'
 import cSwitch from '@/components/Switch'
export default {
  components :{
    cSwitch
  },
  data () {
    return {
        CandidatSession:[],
    }
  },
  computed: {
    RDVLangue() {
        return this.translate('RDVLangue')
      }
    },
   
    mounted(){
    var vm = this;
    vm.getcandidatBySession(vm.$route.params.idSession)
  },

  methods: {
getcandidatBySession(sessionId){
        var vm = this
        CandidatSessionService.getCandidatSession(sessionId).then(
          function(response) {
            vm.CandidatSession = response.data;

          }
        ) 
    },
          ExportExcel() {
    var vm = this;
    CandidatSessionService.getCandidatSession(vm.$route.params.idSession).then(function(response) {
  if (response.status == 200) {
              console.log(response.data)
              /* generate a worksheet */
              var XLSX = require('xlsx')
              var ws = XLSX.utils.json_to_sheet(response.data);
              /* add to workbook */
              var wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, 'nom');
              var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});
              /* generate a download */
              function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
              }
              var ieEDGE = navigator.userAgent.match(/Edge/g);
              var ie = navigator.userAgent.match(/.NET/g);
              var oldIE = navigator.userAgent.match(/MSIE/g);
              if (ie || oldIE || ieEDGE) {
                var blob = new window.Blob([ s2ab(wbout)], {
                  type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                var fileName = '';
                window.navigator.msSaveBlob(blob, fileName);
              } else {
              
                var file = new Blob([s2ab(wbout)], {
                  type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                var fileURL = window.URL.createObjectURL(file);
                var downloadLink = document.createElement("a");
                downloadLink.download = '';
                downloadLink.innerHTML = "Download File";
                downloadLink.href = fileURL;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                downloadLink.click();
              }
            }
    })
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
