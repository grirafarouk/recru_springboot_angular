<template>
<div class="row">
  <!--Liste des Rendez-vous-->

<div class="col-sm-12 col-md-12">


<div>
  <div class="card-header">
  <div>
    Recherche
 </div>
  </div>
       <b-card-body class="card"  :style="{'direction' : rtl}">
           <b-row>
            <b-col sm="2">
              <b-form-group>
                <label>Nom</label>
                 <b-form-input  type="text"  placeholder="Nom" v-model="candidat.nom" ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="2">
              <b-form-group>
                <label>Prénom </label>
                <b-form-input  type="text"  placeholder="Prénom"  v-model="candidat.prenom"></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="2">
              <b-form-group>
                <label>N° téléphone</label>
                <b-form-input  type="text"  placeholder="N° téléphone" v-model="candidat.numeroTel"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="2">
              <b-form-group>
                <label>Email</label>
                <b-form-input  type="text"  placeholder="Email" v-model="candidat.email" ></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="2">
              <b-form-group>
                <label>Date Inscription</label>
                <b-form-input  type="text"  placeholder="Date Inscription" v-model="candidat.dateisncription"></b-form-input>
              </b-form-group>
            </b-col>

          </b-row>
                 <b-row>
            <b-col sm="2">
              <b-form-group>
                <label>Type de profil</label>
                 <b-form-input  type="text"  placeholder="Type de profil" v-model="candidat.technologie" ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="2">
              <b-form-group>
                <label>Nom Sourceur </label>
                <b-form-input  type="text"  placeholder="Nom Sourceur" v-model="candidat.nomSourceur"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="2">
              <b-form-group>
                <label>Prenom Sourceur</label>
                <b-form-input  type="text"  placeholder="Prenom Sourceur" v-model="candidat.prenomSourceur"></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="2">
              <b-form-group>
                <label>Region</label>
                <b-form-input  type="text"  placeholder="Region" v-model="candidat.region" ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="2">
              <b-form-group>
                <label>Fraicheur CV</label>
                <b-form-input  type="text"  placeholder="Fraicheur CV" ></b-form-input>
              </b-form-group>
            </b-col>


          </b-row>
       <div>
  
    <b-button  @click="rechercherNouveauxCandidats()"  variant="info">Rechercher</b-button> 
    <b-button  @click="getCompetences()"  variant="info">Annuler</b-button> 
    <b-button class="btn btn-sm" @click="ExportExcel()">
      <img src="../../assets/excel-icon.png" width="60%">
    </b-button>
 
  </div>
      </b-card-body>

 
      
     
     
  
 
</div>




<div class="card"  :style="{'direction' : rtl}" >


   
  <div class="card-header">
  <div>
  <i class="fa fa-align-justify"></i> 
  Liste nouveaux candidats  
 </div>
  </div>

   <vue-good-table
          :columns= "
          [
        {
          label: 'Nom',
          field: 'nom',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
         {
          label: 'Prénom',
          field: 'prenom',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'N° Téléphone',
          field: 'numeroTel',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Email',
          field: 'email',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Date inscription',
          field: 'dateisncription',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Type de profil',
          field: 'technologie',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Région',
          field: 'region',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Nom sourceur',
          field: 'nomSourceur',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Prénom sourceur',
          field: 'prenomSourceur',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
         {
          label: 'Action',
          field: 'idTache',
          tdClass: 'text-center',
          type: 'number',
       
        }]"

          :rows="NouveauxCandidats"
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
               <span v-if="props.column.field  == 'numeroTel'">
               {{props.row.numeroTel}}
              </span>
               <span v-if="props.column.field  == 'email'">
               {{props.row.email}}
              </span>
               <span v-if="props.column.field  == 'dateisncription'">
               {{props.row.dateisncription}}
              </span>
               <span v-if="props.column.field  == 'technologie'">
               {{props.row.technologie}}
              </span>
                <span v-if="props.column.field  == 'region'">
               {{props.row.region}}
              </span>
                <span v-if="props.column.field  == 'nomSourceur'">
               {{props.row.nomSourceur}}
              </span>
                <span v-if="props.column.field  == 'prenomSourceur'">
               {{props.row.prenomSourceur}}
              </span>

             
             
            </template>
             <div slot="emptystate">
                Pas des données pour la table
            </div>
        
       </vue-good-table>



         <b-modal title="Suppression Competence"  hide-footer class="modal-danger" v-model="warningModal"  >
                 Êtes-vous sûr de vouloir supprimer cette competence ?
            <b-row>
                <b-col sm="6"> </b-col>
                <b-col sm="6"><br>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b-button variant="secondary" :pressed="true"  @click="warningModal = false;">Annuler</b-button> &nbsp;&nbsp;&nbsp;&nbsp;  
                    <b-button variant="secondary"  @click="warningModal = false; deleteCompetence()"> OK</b-button>                  
                </b-col>
           </b-row>
         </b-modal>
</div>
<notifications group="foo" />
</div>



<!-- Partie Ajout --> 

  <b-modal hide-footer title="Ajout Competence" class="modal-primary" v-model="variableModalAjout" @ok="variableModalAjout = false;" ok-variant="primary">
  <div :style="{'direction' : rtl}">
    <b-form class="p-2">
          <b-form-group >
            <label>libelle</label>
            <b-form-input   type="text"  v-model="competence.libelle"></b-form-input>
          </b-form-group>
         
          <b-row>
          </b-row>
           <b-row>
                <b-col sm="6"> 
                </b-col>
                <b-col sm="6">
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b-button variant="secondary" :pressed="true"  @click="variableModalAjout = false; vider()">Annuler</b-button> &nbsp;&nbsp;&nbsp;&nbsp;
                    <b-button variant="success"  @click="addcompetence"> Ajouter </b-button>                  
                </b-col>
           </b-row>            
    </b-form>

    </div>
  </b-modal>


<!-- Partie Modification --> 

  <b-modal hide-footer title="Modification Competence" class="modal-primary" v-model="variableModalUpdate" @ok="variableModalUpdate = false;" ok-variant="primary">
  <div :style="{'direction' : rtl}">
    <b-card-body class="p-2">

          <b-form-group>
            <label>Libelle </label>
            <b-form-input type="text"  :class="{ 'has-error': errors.has('titreUpdate') }" name="titreUpdate" v-validate="'required|min:2'"  placeholder="Libelle" v-model="competence.libelle"></b-form-input>
            <span class="danger"  v-show="errors.has('titreUpdate')" >
                {{ errors.first('titreUpdate') }} 
            </span>
          </b-form-group>

          <b-row>
              <b-col sm="6">
               
              </b-col>
              <b-col sm="6">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b-button variant="secondary" :pressed="true"  @click="cancelUpdate()">Annuler</b-button> &nbsp;&nbsp;&nbsp;&nbsp;
                <b-button variant="success" :disabled="errors.any()" :pressed="true" @click="updatecontact(competence)">{{RDVLangue.modifier}}</b-button>
              </b-col>
          </b-row>
    </b-card-body>

    </div>
  </b-modal>
  

</div>


</template>

<script>
 
 import NouveauxcandidatService from '@/services/candidatsService/NouveauxcandidatService'
 import cSwitch from '@/components/Switch'
export default {
  components :{
    cSwitch
  },
  data () {
    return {
 
        warningModal: false,
        deleteVaraibale : null,
        warningModalShow: false,
        variableModalAjout : false,
        variableModalUpdate : false,
        showVaraibale : null,
      
        NouveauxCandidats : [],

         competence: {
           idCompetence : null,
           libelle : null
         },
          competenceform: {
            libelle: null
         },
           candidat: {
           idCandidat : null,
           nom : null,
           prenom : null,
           numeroTel : null,
           email : null,
           dateisncription : null,
           technologie : null,
           nomSourceur : null,
           prenomSourceur : null,
           region : null
         },
    }
  },
  computed: {
    RDVLangue() {
        return this.translate('RDVLangue')
      }
    },
   
  created(){
    var vm = this;
  vm.getCompetences();
  },

  methods: {
    getCompetences(){
        var vm = this;
    NouveauxcandidatService.getCandidatsArelancer().then(function(response) {
            vm.NouveauxCandidats = response.data;
          })
      },
      rechercherNouveauxCandidats(){
     var vm = this;
    NouveauxcandidatService.rechercherNouveauxCandidats(vm.candidat).then(function(response) {
            vm.NouveauxCandidats = response.data;
             })
      },
      ExportExcel() {
    var vm = this;
    NouveauxcandidatService.getNouveauxCandidatsExcel(vm.candidat).then(function(response) {
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
