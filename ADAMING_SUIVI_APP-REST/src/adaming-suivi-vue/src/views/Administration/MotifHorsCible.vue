<template>
<div class="row">
  <!--Liste des Rendez-vous-->

<div class="col-sm-12 col-md-12">
<div class="card"  :style="{'direction' : rtl}" >
  <div class="card-header">
  <div>
  <i class="fa fa-align-justify"></i> 
  Origines CV
    <span :style="{'float' : float}" ><b-button  @click="modalAjout()" variant="info">{{RDVLangue.ajouter}}</b-button> </span>

  
 </div>
  </div>

   <vue-good-table
          :columns= "
          [
        {
          label: 'libelle',
          field: 'libelle',
          tdClass: 'text-center',
         filterOptions: {
            enabled: true,
          },
        },
         {
          label: 'Opération',
          field: 'idTache',
          tdClass: 'text-center',
          type: 'number',
       
        }]"

          :rows="Motifs"
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
              <span v-if="props.column.field  == 'libelle'">
               {{props.row.libelle}}
              </span>
              


              <span v-if="props.column.field  == 'idTache'">
               <a  @click="modalUpdate(props.row)"><i class="material-icons text-primary cursor"  title="modifier">edit</i></a> 
              <a  @click="modalDelete(props.row.id)"  variant="warning"  ><i class="material-icons text-primary cursor" title="Supprimer">delete</i></a>
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

  <b-modal hide-footer title="Ajout Lieu" class="modal-primary" v-model="variableModalAjout" @ok="variableModalAjout = false;" ok-variant="primary">
  <div :style="{'direction' : rtl}">
    <b-form class="p-2">
          <b-form-group >
            <label>libelle</label>
            <b-form-input   type="text" placeholder="Libelle"  v-model="lieu.libelle"></b-form-input>
          </b-form-group>
            <b-form-group >
            <label>Adresse</label>
            <b-form-input   type="text" placeholder="Adresse"  v-model="lieu.adresseAdaming"></b-form-input>
          </b-form-group>
         
          <b-row>
          </b-row>
           <b-row>
                <b-col sm="6"> 
                </b-col>
                <b-col sm="6">
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b-button variant="secondary" :pressed="true"  @click="variableModalAjout = false; vider()">Annuler</b-button> &nbsp;&nbsp;&nbsp;&nbsp;
                    <b-button variant="success"  @click="addlieu()"> Ajouter </b-button>                  
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
            <b-form-input type="text"  :class="{ 'has-error': errors.has('titreUpdate') }" name="titreUpdate" v-validate="'required|min:2'"  placeholder="Libelle" v-model="lieu.libelle"></b-form-input>
            <span class="danger"  v-show="errors.has('titreUpdate')" >
                {{ errors.first('titreUpdate') }} 
            </span>
          </b-form-group>

          <b-form-group>
            <label>Adresse </label>
            <b-form-input type="text"  :class="{ 'has-error': errors.has('titreUpdate') }" name="titreUpdate" v-validate="'required|min:2'"  placeholder="Adresse" v-model="lieu.adresseAdaming"></b-form-input>
            <span class="danger"  v-show="errors.has('titreUpdate')" >
                {{ errors.first('titreUpdate') }} 
            </span>
          </b-form-group>

          <b-row>
              <b-col sm="6">
               
              </b-col>
              <b-col sm="6">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b-button variant="secondary" :pressed="true"  @click="cancelUpdate()">Annuler</b-button> &nbsp;&nbsp;&nbsp;&nbsp;
                <b-button variant="success" :disabled="errors.any()" :pressed="true" @click="updatelieu(lieu)">Modifier</b-button>
              </b-col>
          </b-row>
    </b-card-body>

    </div>
  </b-modal>
  

</div>


</template>

<script>
 
 import MotifService from '@/services/administrationService/MotifService'
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
      
        Motifs : [],
          lieu: {
           idLieu : null,
           libelle : null,
           adresseAdaming: null
         },
         lieuform: {
            libelle: null,
            adresse: null
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
  vm.getMotifs();
  },

  methods: {
    getMotifs(){
        var vm = this;
    MotifService.getAllMotifs().then(function(response) {
            vm.Motifs = response.data;
          })
      },
      addlieu() {
      var vm = this;
      LieuService.addLieux(vm.lieu)
        .then(response => {         
            vm.variableModalAjout = false;
            vm.getLieux();
            vm.reset();
         
        })
        .then(() => {
          this.errors.clear();
        });
    },
     reset() {
      var vm = this;
      vm.lieuform.libelle = null
    },
   vider(){
            this.competence.libelle = null
   },
   

  updatelieu(lieu) {
      var vm = this;
      LieuService.updateLieux(lieu).then(response => {
        vm.getLieux();
        vm.variableModalUpdate = false;
      });
    },

    deleteCompetence(){   
      var vm = this
      CompetenceService.deleteCompetences(vm.deleteVaraibale).then(
        function(response){
          if(response.data == true){
            vm.getCompetences()   
          }
        })
    },

     modalAjout(){
      var vm = this
      vm.errors.clear()
      vm.variableModalAjout = true
    },
    modalUpdate(lieu){
      var vm = this;
      vm.errors.clear()
      vm.lieu=Object.assign({}, vm.lieu,  lieu)
      vm.variableModalUpdate = true
      

    },
    modalDelete(idCompetence){
      var vm = this
      vm.deleteVaraibale=idCompetence
      vm.warningModal = true
    },
    cancelUpdate(){
      this.variableModalUpdate = false
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
