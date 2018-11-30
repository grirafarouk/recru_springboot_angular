import { Profil } from "./models/enum/Profil";
import { NAVIGATION_RULES } from "./helper/application.constant";

export const navItems = [
  {
    name: 'Session Formation Accueil',
    url: '/' + NAVIGATION_RULES.sessionsFormationsAcceuil.url + '/' + NAVIGATION_RULES.sessionsFormationsAcceuil.listAcceuil,
    icon:'fa fa-play',
    profils: [Profil.PROFILSPECIAL],

  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],
  },
  {
    icon: 'icon-people',
    name: 'Candidats',
    url: '/' + NAVIGATION_RULES.candidats.url,
    profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION,Profil.SOURCEUR],

    children: [
      {
        name: 'Nouveaux Condidats',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.newCancidat,
        profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION,Profil.SOURCEUR],
        icon: 'fa fa-user-plus',
      },
      {
        name: 'Liste Nouveaux Condidats',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.listeNouveauxCandidats,
        profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],
        icon: 'fa fa-list',
      },
      {
        name: 'Liste Tous Condidats',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.listeTousCandidats,
        icon: 'fa fa-suitcase',
        profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],
      },
      {
        name: 'Candidats A Relancer',
        icon: 'fa fa-retweet',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.listeCandidatArelancer,
        profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],
      },
    ]
  },
  {
    name: 'Entretien',
    url: '/' + NAVIGATION_RULES.entretien.url + '/' + NAVIGATION_RULES.entretien.list,
    icon: 'icon-note',
    profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],

  },
  {
    name: 'Sessions Formations',
    icon: 'icon-briefcase',
    url: '/' + NAVIGATION_RULES.sessionsFormations.url,
    profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],
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
    profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],
  },
  {
    name: 'Reporting Sourceur',
    url: '/' + NAVIGATION_RULES.reporting.url + '/' + NAVIGATION_RULES.reporting.reportingSourceur,
    icon: 'icon-pie-chart',
    profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],
  },
  {
    name: 'Administration',
    icon: 'icon-wrench',
    url: '/' + NAVIGATION_RULES.administration.url,
    profils: [Profil.ADMINISTRATEUR],
    children: [
      {
        name: 'Competences',
        icon:'fa fa-info',
        url: '/' + NAVIGATION_RULES.administration.url+"/"+NAVIGATION_RULES.administration.competences,
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Utilisateurs',
        icon:'fa fa-group',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.utilisateurs,
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Lieux',
        icon:'fa fa-map-marker',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.lieux,
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Origine CV',
        icon:'fa fa-at',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.origineCV,
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Technologies',
        icon: 'fa fa-code',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.technologies,
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Type Formation',
        icon:'fa fa-graduation-cap',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.typeFormation,
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Filiere',
        icon:'fa fa-institution',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.filiere,
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Client Session',
        icon:'fa fa-credit-card',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.clientSession,
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Motif Hors Cible',
        icon:'fa fa-eye-slash',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.motifHorsCible,
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Region',
        icon:'fa fa-location-arrow',
        url: '/' + NAVIGATION_RULES.administration.url+'/'+NAVIGATION_RULES.administration.region,
        profils: [Profil.ADMINISTRATEUR],
      }
    ]
  },
  // {
  //   title: true,
  //   name: 'Theme',
  //   profils: [Profil.ADMINISTRATEUR],
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   icon: 'icon-drop',
  //   profils: [Profil.ADMINISTRATEUR],
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   profils: [Profil.ADMINISTRATEUR],
  //   icon: 'icon-pencil'
  // },
  // {
  //   title: true,
  //   profils: [Profil.ADMINISTRATEUR],
  //   name: 'Components'
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   icon: 'icon-puzzle',
  //   profils: [Profil.ADMINISTRATEUR],
  //   children: [
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Carousels',
  //       url: '/base/carousels',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Collapses',
  //       url: '/base/collapses',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Forms',
  //       url: '/base/forms',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/paginations',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Switches',
  //       url: '/base/switches',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   icon: 'icon-cursor',
  //   profils: [Profil.ADMINISTRATEUR],
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Brand Buttons',
  //       url: '/buttons/brand-buttons',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   profils: [Profil.ADMINISTRATEUR],
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   profils: [Profil.ADMINISTRATEUR],
  //   children: [
  //     {
  //       name: 'CoreUI Icons',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       }
  //     },
  //     {
  //       name: 'Flags',
  //       url: '/icons/flags',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   profils: [Profil.ADMINISTRATEUR],
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   profils: [Profil.ADMINISTRATEUR],
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   divider: true
  // },
  // {
  //   title: true,
  //   name: 'Extras',
  //   profils: [Profil.ADMINISTRATEUR],
  // },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   icon: 'icon-star',
  //   profils: [Profil.ADMINISTRATEUR],
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   profils: [Profil.ADMINISTRATEUR],
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   profils: [Profil.ADMINISTRATEUR],
  // }
];
