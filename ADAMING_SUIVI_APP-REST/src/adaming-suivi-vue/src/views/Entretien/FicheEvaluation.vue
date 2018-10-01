<template>
 <div class="panel-body">
        <div class="container-fluid">
 <div class="row">
                <div class="col-sm-6">
		          <pdf :src="fileURL"></pdf>
            	</div>
                <div class="col-sm-6">   
<div>
       <b-card-body class="card">
         <b-row class="justify-content-md-center">
            <b-col sm="5">
               <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Civilite</label>
                <b-form-input  type="text"  placeholder="Civilite" v-model="candidat.civilite" ></b-form-input>
              </b-form-group>
              </b-col>
               <b-col sm="5">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">code postal</label>
                <b-form-input  type="text"  placeholder="code postal" v-model="LibelleCodePostal" ></b-form-input>
              </b-form-group>
              </b-col>
             
          </b-row>

           <b-row class="justify-content-md-center">
            <b-col sm="5">
                
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Nom</label>
                 <b-form-input  type="text"  placeholder="nom" v-model="candidat.nom"></b-form-input>
              </b-form-group>
            </b-col>
           <b-col sm="5">
             <b-form-group>
                <label style="font-weight:bold;color:#546E7A">région</label>
                <b-form-input  type="text"  placeholder="région" v-model="candidat.codePostal.departement.region.code" ></b-form-input>
              </b-form-group>
              
            </b-col>
             
          </b-row>

           <b-row class="justify-content-md-center">
              <b-col sm="5">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Prénom</label>
                <b-form-input  type="text"  placeholder="prenom" v-model="candidat.prenom"></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="5">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">ville</label>
                <b-form-input  type="text"  placeholder="ville" v-model="candidat.codePostal.ville" ></b-form-input>
              </b-form-group>
            </b-col>
  
            <b-col sm="5">
              
            </b-col>
          </b-row>

            <b-row class="justify-content-md-center">
              <b-col sm="5">
             <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Email</label>
                <b-form-input  type="text"  placeholder="Email" v-model="candidat.email"></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="5">
              <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Profil</label>
                <b-form-input  type="text"  placeholder="Profil" v-model="candidat.technologie.libelle" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="justify-content-md-center">
              <b-col sm="5">
             <b-form-group>
                <label style="font-weight:bold;color:#546E7A">N° Téléphone</label>
                <b-form-input  type="text"  placeholder="N° Téléphone" v-model="candidat.numeroTel" ></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="5">
            <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Origine CV </label>
                <b-form-input  type="text"  placeholder="Origine CV" v-model="candidat.origine.libelle" ></b-form-input>
              </b-form-group>
            </b-col>

          </b-row>

           <b-row class="justify-content-md-center">
              <b-col sm="5">
             <b-form-group label="Mobilité" style="font-weight:bold;color:#546E7A">
              <b-form-radio-group id="radios2"  name="radioSubComponent" v-model="candidat.mobiliteSrc">
             <b-form-radio value="first">oui</b-form-radio>
              <b-form-radio value="second">non</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
            </b-col>
             <b-col sm="5">
        <b-form-group label="Pole Emploi" style="font-weight:bold;color:#546E7A">
              <b-form-radio-group id="radios2"  name="radioSubComponent" v-model="candidat.mobiliteSrc">
             <b-form-radio value="first">oui</b-form-radio>
              <b-form-radio value="second">non</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
            </b-col>

          </b-row>
          <br/> <br/>
        <b-row class="justify-content-md-center">
              <b-col sm="5">
             <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Adresse</label>
                <b-form-input  type="text"  placeholder="adresse" v-model="candidat.adresse" ></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="5">
            <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Date de naissance</label>
                   <date-picker Style="width:100%"
                            v-model="candidat.dateNaissance" 
                            type="date"
                            lang="fr"
                            format="dd/MM/yyyy"
                            :not-after= endDate
                            not-before='01/01/1900'>
                        </date-picker>
              </b-form-group>
            </b-col>

          </b-row>

           <b-row class="justify-content-md-center">
              <b-col sm="5">
             <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Diplome</label>
                <b-form-input  type="text"  placeholder="diplome" v-model="candidat.diplome" ></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="5">
            <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Age</label>
                <b-form-input  type="text"  placeholder="age" v-model="candidat.age" ></b-form-input>
              </b-form-group>
            </b-col>

          </b-row>

            <b-row class="justify-content-md-center">
              <b-col sm="5">
             <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Date d'obtention du diplome</label>
                 <date-picker Style="width:100%"
                            v-model="candidat.dateObtentionDiplome" 
                            type="date"
                            lang="fr"
                            format="dd/MM/yyyy"
                            :not-after= endDate
                            not-before='01/01/1900'>
                        </date-picker>
              </b-form-group>
            </b-col>
             <b-col sm="5">
            <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Lieu de naissance</label>
                <b-form-input  type="text"  placeholder="lieu Naissance" v-model="candidat.lieuNaissance" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

           <b-row class="justify-content-md-center">
              <b-col sm="5">
             <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Nom Sourceur</label>
                <b-form-input  type="text"  placeholder="Nom Sourceur" v-model="candidat.creePar.nom" ></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="5">
            <b-form-group>
                <label style="font-weight:bold;color:#546E7A">Prénom Sourceur</label>
                <b-form-input  type="text"  placeholder="Prénom Sourceur" v-model="candidat.creePar.prenom" ></b-form-input>
              </b-form-group>
            </b-col>

          </b-row>
        <!--<b-row class="justify-content-md-center">
           <b-form-group>
           <b-form-checkbox-group id="checkboxes1" name="flavour1"  :options="options">
           </b-form-checkbox-group>
           </b-form-group>
        </b-row>-->
         <br/> <br/>
         
          

          <span>
          <router-link to="/candidats/listenouveauxcandidats" class="right">
           <b-button variant="info" class="pull-right">Annuler</b-button> 
          </router-link>
          </span>
      </b-card-body>
</div>
                </div>
            </div>
        </div>
 </div>
</template>
<script>
import FicheService from '@/services/entretienService/EntretienService'
import cSwitch from '@/components/Switch'
import pdf from 'vue-pdf';
import CompetenceService from '@/services/administrationService/CompetenceService'
 import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import LieuService from '@/services/administrationService/LieuService'
  import mask from 'vue-r-mask'
   import moment from 'moment';
export default {
  components :{
    pdf,
    flatPickr
    },
  data () {
    return {
          mask: /\d{2}:\d{2}/,
          fileURL : null,
          candidat : [],
          formEntretien : {
            disponibilite : null,
            dateEntretien : null,
            lieuEntretien : null
          },
          LibelleCodePostal : null,
          id: null,
          options: [],
           Lieux : [],
          selected: null,
          pertinence : null,
          disponibilite: [],
      pertinences : [
        { value: '0', text: '0' },
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
      ],
       dateentretien: null,
       heureentretien: null,
       daterelance: null,
     config: {
       altFormat: "j/M/Y",
       altInput: true,
     }
    }
  },
  computed: {
    RDVLangue() {
        return this.translate('RDVLangue')
      }
    },
   
   mounted(){
    var vm = this;
    this.c = { 'id' : vm.$route.params.id }, 
        FicheService.getCandidatByID(vm.$route.params.id).then(
          function(response) {
            vm.candidat = response.data,
            vm.CodePostal()
          }),
           
    FicheService.downloadCVPdf(this.c).then(function(response) {
  if (response.status == 200) {
                vm.fileURL = window.URL.createObjectURL(response.data);
            }
    }),
     CompetenceService.getCompetences().then(function(response) {
            vm.options = response.data;
          }),
          
    LieuService.getAllLieux().then(function(response) {
            vm.Lieux = response.data;
          }),
    FicheService.getDisponibilite().then(function(response) {
            vm.disponibilite = response.data;
          })
  },

  methods: { 
      CodePostal(){
  if (this.candidat.codePostal){
   this.LibelleCodePostal = this.candidat.codePostal.code.toString() + ' (' + this.candidat.codePostal.ville.toString() + ') '; 
   }
 },
 verifEntretien(){
   if (this.candidat.entretien == null){
     this.candidat.entretien == null,
     this.candidat.entretien.disponible == null
   }
 }
  },
  directives: {
    mask: mask,
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.clearfix{
    max-height : 50px;
}
.row-fluid p{
    font-size: 0.9em;
}
.col-xs-6{
    padding: 0px;
    margin: 0px;
    width: 10px;
}
.col-xs-7{
    padding: 0px;
    margin: 0px;
    width: 700px;
}
.card{
    padding: 0px;
    margin: 0px;
    height:990px;
}
.col-xs-5{
    padding: 0px;
    margin: 0px;
    width: 520px;
}
.col-xs-12{
    padding: 0px;
    padding-top: 10px;
    margin: 0px;

}

.input-group-addon{
    font-size: 0.8em;
}
.input-group input{
    
    font-size: 0.8em;

}

.form-control[readonly] {
    background-color: #ffffff;
    opacity: 1;
}
</style>
