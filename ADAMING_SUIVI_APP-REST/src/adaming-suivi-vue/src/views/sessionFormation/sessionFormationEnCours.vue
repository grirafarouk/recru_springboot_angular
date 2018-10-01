<template>

<div class="accordions"> 
  <div>
  <div class="card-header">
  <div>
    Recherche
 </div>
  </div>
       <b-card-body class="card"  :style="{'direction' : rtl}">
           <b-row>
              <b-col sm="4">
              <b-form-group>
                <label>Nom Formation</label>
                 <b-form-input  type="text"  placeholder="Code Formation" v-model="formationn.code"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label>Nom Formation</label>
                 <b-form-input  type="text"  placeholder="Nom Formation" v-model="formationn.nom"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label>Technologie </label>
                 <b-form-select v-model="formationn.technologie.libelle" >
                   <option :value="null">-- Sélectionner --</option>
                     <option v-for="technologie in technologies">{{technologie.libelle}}</option>
              </b-form-select> 
              </b-form-group>
            </b-col>
            

          </b-row>
           <b-row>
            <b-col sm="4">
              <b-form-group>
                <label>Lieu</label>
                 <b-form-select v-model="formationn.lieu.libelle" >
                   <option :value="null">-- Sélectionner --</option>
                     <option v-for="Lieu in Lieux">{{Lieu.libelle}}</option>
              </b-form-select> 
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label>Type de formation </label>
                  <b-form-select v-model="formationn.typeFormation.libelle" >
                   <option :value="null">-- Sélectionner --</option>
                     <option v-for="TypeFormation in TypeFormations">{{TypeFormation.libelle}}</option>
              </b-form-select> 
              </b-form-group>
            </b-col>
             <b-col sm="4">
              <b-form-group>
                <label>Date démarrage</label>
                
                <date-picker Style="width:100%"
                            v-model="session.dateDemarrage" 
                            type="date"
                            lang="fr"
                            format="dd/MM/yyyy"
                            :not-after= endDate
                            not-before='01/01/1900'>
                        </date-picker>
              </b-form-group>
            </b-col>
            

          </b-row>
       <div>
   <b-button @click="rechercherSession()" variant="success">Rechercher</b-button> 
   <b-button  @click="getSessions()"  variant="danger">Annuler</b-button> 
  </div>
      </b-card-body>
</div>         
                    <div role="tablist">
                        <b-card no-body class="mb-1"  v-for="(formation, index) in formations">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-btn block  v-b-toggle="'accordionT'+index" variant="info">{{formation.code}}</b-btn>
                            </b-card-header>
                            <b-collapse v-bind:id="'accordionT'+index" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <div class="linkHolder">
                 <div class="panel-body">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Nom Formation</th>
                                <th>Technologie</th>
                                <th>Lieu</th>
                                <th>Type Formation</th>
                                <th>Date Démarage</th>
                                <th>Date Fin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-for="session in sessionformations">
                                <tr v-if="formation.id == session.formation.id">
                                <td>{{session.formation.code}}</td>
                                <td>{{session.formation.nom}}</td>
                                <td>{{session.formation.technologie.libelle}}</td>
                                <td>{{session.formation.lieu.libelle}}</td>
                                <td>{{session.formation.typeFormation.libelle}}</td>
                                <td>{{timeStampToDate(session.dateDemarrage).ddmmyyyy}}</td>
                                <td>{{timeStampToDate(session.dateFin).ddmmyyyy}}</td>
                                <td><router-link :to="/ficheSession/+ session.id">
                                  <i  class="material-icons text-primary cursor" title="Voir fiche">visibility</i>
                                </router-link></td>
                                </tr>
                        </tbody>
                    </table>
                </div>
                                </div>
                            </b-card-body>
                            </b-collapse>
                        </b-card>
                    </div>
                </div> 
</template>
<script>
 import cSwitch from '@/components/Switch'
 import SessionService from "@/services/sessionService/SessionService";
 import TechnologieService from '@/services/administrationService/TechnologieService'
 import LieuService from '@/services/administrationService/LieuService'
 import TypeFormationService from '@/services/administrationService/TypeFormationService'
  import moment from 'moment';
export default {
  components :{
    cSwitch
  },
  data () {
    return {
    formations : [],
    technologies : [],
    Lieux : [],
    TypeFormations : [],
    sessionformations : [],
    session : {
      dateDemarrage : null,
      dateFin : null
    },
    formationn : {
      nom : null,
      code : null,
      lieu : {
        libelle : '',
      },
      typeFormation : {
        libelle : '',
      },
      technologie : {
        libelle : ''
      }
    },
    t:[]
    }
  },
  computed: {
    RDVLangue() {
        return this.translate('RDVLangue')
      }
    },
   
  created(){
    var vm = this;
    vm.getSessions();
  },

  methods: {
    getSessions() {
      var vm = this;
      SessionService.getSessionsFormationencours().then(function(response) {
      vm.formations = response.data
      });
       SessionService.getSessionsFormation().then(function(response) {
      vm.sessionformations = response.data
      });
      TechnologieService.getAllTechnologies().then(function(response) {
            vm.technologies = response.data;
          });
      LieuService.getAllLieux().then(function(response) {
            vm.Lieux = response.data;
          });
      TypeFormationService.getAllTypeFormations().then(function(response) {
            vm.TypeFormations = response.data;
          });
      vm.formationn.nom=vm.formationn.technologie.libelle=vm.formationn.lieu.libelle=vm.formationn.typeFormation.libelle='';

    },
    rechercherSession(){
     var vm = this;
    SessionService.rechercherSessionFormationencours(vm.formationn,vm.session).then(function(response) {
            vm.formations = response.data;
             })
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
<style>
.btn-info {
    color: #151b1e;
    background-color: #aa9f9f00;
    border-color: #f3f3f3;
}
</style>


