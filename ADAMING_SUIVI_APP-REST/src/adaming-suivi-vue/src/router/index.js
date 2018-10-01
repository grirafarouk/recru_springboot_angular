import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import auth from '@/views/user/Auth'
import Dashboard from '@/views/Dashboard'
import Competence from '@/views/Administration/Competence'
import Lieu from '@/views/Administration/Lieu'
import Utilisateur from '@/views/Administration/Utilisateur'
import Origine from '@/views/Administration/Origine'
import Technologie from '@/views/Administration/Technologie'
import TypeFormation from '@/views/Administration/TypeFormation'
import MotifHorsCible from '@/views/Administration/MotifHorsCible'
import Region from '@/views/Administration/Region'
import ClientSession from '@/views/Administration/ClientSession'
import ListeNouveauxCandidats from '@/views/Candidats/ListeNouveauxCandidats'
import ListeCandidatsArelancer from '@/views/Candidats/ListeCandidatsArelancer'
import ListeTousCandidats from '@/views/Candidats/ListeTousCandidats'
import ListeEntretien from '@/views/Entretien/ListeEntretien'
import FicheEntretien from '@/views/Entretien/FicheEntretien'
import FicheEvaluation from '@/views/Entretien/FicheEvaluation'
import sessionFormationEnCours from '@/views/sessionFormation/sessionFormationEnCours'
import sessionFormationClotures from '@/views/sessionFormation/sessionFormationClotures'
import Formation from '@/views/Administration/Formation'
import FicheCVRelance from '@/views/FicheCvRelance'
import FicheCandidatSession from '@/views/FicheCandidatSession'
import FicheSessionFormation from '@/views/sessionFormation/ficheSessionFormation'
import reportingSourceur from '@/views/reporting/reportingSourceur'
import FicheReporting from '@/views/reporting/FicheReporting'
import NouveauxCandidat from '@/views/Candidats/NouveauxCandidat'
Vue.use(Router)

export default new Router({
  mode: 'history', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      //redirect: '/auth',
      name: 'auth',
      component: auth
    },
   /* {
      path: '/',
      name: 'auth',
      component: auth,
      children: [
        {
          path: 'auth',
          name: 'Auth',
          component: Dashboard
        }

      ]
    },*/
    {
      path: '/',
      //redirect: '/accueil',
      name: 'Accueil',
      component: Full,
      children: [
        {
          path: 'accueil',
          name: 'Accueil',
          component: Dashboard
        },
        {
          path: 'candidats',
          redirect: '/candidats/listenouveauxcandidats',
          name: 'Candidats',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'nouveaucandidat',
              name: 'Nouveau candidat',
              component: NouveauxCandidat
            },
            {
              path: 'listenouveauxcandidats',
              name: 'Liste nouveaux candidats',
              component: ListeNouveauxCandidats
            },
            {
              path: 'listeTouscandidats',
              name: 'liste Tous candidats',
              component: ListeTousCandidats
            },
            {
              path: 'listecandidatsARelancer',
              name: 'liste candidats A Relancer',
              component: ListeCandidatsArelancer
            }
          ]
        },
        {
          path: 'Entretien',
          redirect: '/Entretien/entretien',
          name: 'Entretien',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'entretien',
              name: 'Entretien',
              component: ListeEntretien
            }
          ]
        },
        {
          path: 'sessionformation',
          redirect: '/sessionformation/sessionFormationsEncours',
          name: 'Session formation',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'sessionFormationsEncours',
              name: 'Session formation en cours',
              component: sessionFormationEnCours
            },
            {
              path: 'sessionFormationsclotures',
              name: 'Session formation clotures',
              component: sessionFormationClotures
            }
          ]
        },
        {
          path: 'reportingSourceur',
          name: 'Reporting Sourceur',
          component: reportingSourceur
        },
        {
          path: 'administration',
          redirect: '/administration/competence',
          name: 'Administration',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'competence',
              name: 'Competence',
              component: Competence
            },
            {
              path: 'lieux',
              name: 'Lieux',
              component: Lieu
            },
            {
              path: 'utilisateur',
              name: 'Utilisateurs',
              component: Utilisateur
            },
            {
              path: 'origineCV',
              name: 'OrigineCV',
              component: Origine
            },
            {
              path: 'technologie',
              name: 'Technologie',
              component: Technologie
            },
            {
              path: 'typeFormation',
              name: 'TypeFormation',
              component: TypeFormation
            },
            {
              path: 'formation',
              name: 'Formation',
              component: Formation
            },
            {
              path: 'motifhorscible',
              name: 'Motif Hors Cible',
              component: MotifHorsCible
            },
            {
              path: 'region',
              name: 'Region',
              component: Region
            },
            {
              path: 'clientSession',
              name: 'Client Session',
              component: ClientSession
            }
          ]
        },
        {
          path: 'fiche-entretien/:id(\\d+)',
          name: 'Fiche Entretien',
          component: FicheEntretien
        },
        {
          path: 'fiche-evaluation/:id(\\d+)',
          name: 'Fiche Evaluation',
          component: FicheEvaluation
        },
        {
          path: 'fiche-reporting/:id(\\d+)',
          name: 'Fiche Reporting',
          component: FicheReporting
        },
        {
          path: 'ficheCVRelance/:idUser(\\d+)',
          name: 'ficheCVRelance',
          component: FicheCVRelance
        },
        {
          path: 'ficheCandidatSession/:idSession(\\d+)',
          name: 'FicheCandidatSession',
          component: FicheCandidatSession
        },
        {
          path: 'ficheSession/:id(\\d+)',
          name: 'FicheSession',
          component: FicheSessionFormation
        }
      ]
    }
  ]
})
