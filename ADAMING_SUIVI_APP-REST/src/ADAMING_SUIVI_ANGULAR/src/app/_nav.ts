import { NAVIGATION_RULES } from "./helper/application.constant";
import { USER_ROLE } from "./helper/application.constant";
export const navItems = [
  {
    name: 'Session Formation Accueil',
    url: '/' + NAVIGATION_RULES.sessionsFormationsAcceuil.url + '/' + NAVIGATION_RULES.sessionsFormationsAcceuil.listAcceuil,
    icon:'fa fa-play',
    profils: [USER_ROLE.PROFILSPECIAL],

  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION],
  },
  {
    icon: 'icon-people',
    name: 'Candidats',
    url: '/' + NAVIGATION_RULES.candidats.url,
    profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION,USER_ROLE.SOURCEUR],

    children: [
      {
        name: 'Nouveaux Candidats',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.newCancidat,
        profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION,USER_ROLE.SOURCEUR],
        icon: 'fa fa-user-plus',
      },
      {
        name: 'Liste Nouveaux Candidats',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.listeNouveauxCandidats,
        profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION],
        icon: 'fa fa-list',
      },
      {
        name: 'Liste Tous Candidats',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.listeTousCandidats,
        icon: 'fa fa-suitcase',
        profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION],
      },
      {
        name: 'candidats à relancer',
        icon: 'fa fa-retweet',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.listeCandidatArelancer,
        profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION],
      },
    ]
  },
  {
    name: 'Entretien',
    url: '/' + NAVIGATION_RULES.entretien.url + '/' + NAVIGATION_RULES.entretien.list,
    icon: 'icon-note',
    profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION],

  },
  {
    name: 'Sessions Formations',
    icon: 'icon-briefcase',
    url: '/' + NAVIGATION_RULES.sessionsFormations.url,
    profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION],
    children: [
      {
        name: 'En Cours',
        icon:'fa fa-play',
        url: '/' + NAVIGATION_RULES.sessionsFormations.url + '/' + NAVIGATION_RULES.sessionsFormations.enCours,
      },
      {
        name: 'Clôturée',
        icon:'fa fa-stop-circle-o',
        url: '/' + NAVIGATION_RULES.sessionsFormations.url + '/' + NAVIGATION_RULES.sessionsFormations.clotures,
      } 
    ]
  },
  {
    name: 'Reporting',
    url: '/' + NAVIGATION_RULES.reporting.url + '/' + NAVIGATION_RULES.reporting.listeReporting,
    icon: 'icon-graph', 
    profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION],
  },
  {
    name: 'Reporting Sourceur',
    url: '/' + NAVIGATION_RULES.reporting.url + '/' + NAVIGATION_RULES.reporting.reportingSourceur,
    icon: 'icon-pie-chart',
    profils: [USER_ROLE.CHARGE, USER_ROLE.ADMINISTRATEUR, USER_ROLE.COMMERCIAL, USER_ROLE.DIRECTION],
  },
  {
    name: 'Administration',
    icon: 'icon-wrench',
    url: '/' + NAVIGATION_RULES.administration.url,
    profils: [USER_ROLE.ADMINISTRATEUR],
    children: [
      {
        name: 'Competences',
        icon:'fa fa-info',
        url: '/' + NAVIGATION_RULES.administration.url+"/"+NAVIGATION_RULES.administration.competences,
        profils: [USER_ROLE.ADMINISTRATEUR],
      },
      {
        name: 'Profil',
        icon:'fa fa-info',
        url: '/' + NAVIGATION_RULES.administration.url+"/"+NAVIGATION_RULES.administration.role,
        profils: [USER_ROLE.ADMINISTRATEUR], 
      },
      {
        name: 'Status',
        icon:'fa fa-info',
        url: '/' + NAVIGATION_RULES.administration.url+"/"+NAVIGATION_RULES.administration.status,
        profils: [USER_ROLE.ADMINISTRATEUR], 
      },
      {
        name: 'Disponiblité',
        icon:'fa fa-info',
        url: '/' + NAVIGATION_RULES.administration.url+"/"+NAVIGATION_RULES.administration.disponible,
        profils: [USER_ROLE.ADMINISTRATEUR], 
      },
      {
        name: 'Utilisateurs',
        icon:'fa fa-group',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.utilisateurs,
        profils: [USER_ROLE.ADMINISTRATEUR],
      },
      {
        name: 'Lieux',
        icon:'fa fa-map-marker',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.lieux,
        profils: [USER_ROLE.ADMINISTRATEUR],
      },
      {
        name: 'Origine CV',
        icon:'fa fa-at',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.origineCV,
        profils: [USER_ROLE.ADMINISTRATEUR],
      },
      {
        name: 'Technologies',
        icon: 'fa fa-code',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.technologies,
        profils: [USER_ROLE.ADMINISTRATEUR],
      },
      {
        name: 'Type Formation',
        icon:'fa fa-graduation-cap',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.typeFormation,
        profils: [USER_ROLE.ADMINISTRATEUR],
      },
      {
        name: 'Filiere',
        icon:'fa fa-institution',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.filiere,
        profils: [USER_ROLE.ADMINISTRATEUR],
      },
      {
        name: 'Client Session',
        icon:'fa fa-credit-card',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.clientSession,
        profils: [USER_ROLE.ADMINISTRATEUR],
      },
      {
        name: 'Motif Hors Cible',
        icon:'fa fa-eye-slash',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.motifHorsCible,
        profils: [USER_ROLE.ADMINISTRATEUR],
      },
      {
        name: 'Region',
        icon:'fa fa-location-arrow',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.region,
        profils: [USER_ROLE.ADMINISTRATEUR],
      }
    ]
  },
 
];
