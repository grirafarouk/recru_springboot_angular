import { Profil } from "./models/enum/Profil";
import { NAVIGATION_RULES } from "./helper/application.constant";

export const navItems = [
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
    children: [
      {
        name: 'Nouveaux Condidats',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.newCancidat,
        icon: 'icon-user-follow',
      },
      {
        name: 'Liste Nouveaux Condidats',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.listeNouveauxCandidats,
        profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],
        icon: 'icon-list',
      },
      {
        name: 'Liste Tous Condidats',
        url: '/' + NAVIGATION_RULES.candidats.url + '/' + NAVIGATION_RULES.candidats.listeTousCandidats,
        icon: 'icon-list',
        profils: [Profil.CHARGE, Profil.ADMINISTRATEUR, Profil.COMMERCIAL, Profil.DIRECTION],
      },
      {
        name: 'Candidats A Relancer',
        icon: 'icon-list',
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
        name: 'Sessions formations en cours',
        icon:'icon-list',
        url: '/' + NAVIGATION_RULES.sessionsFormations.url + '/' + NAVIGATION_RULES.sessionsFormations.enCours,
      },
      {
        name: 'Sessions formations clotures',
        icon:'icon-list',
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
    url: '/administration',
    profils: [Profil.ADMINISTRATEUR],
    children: [
      {
        name: 'Competences',
        url: '/administration',
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'Utilisateurs',
        url: '/administration/utilisateurs',
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'lieux',
        url: '/administration/lieux',
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'origineCV',
        url: '/administration/origineCV',
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'technologies',
        url: '/administration/technologies',
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'typeFormation',
        url: '/administration/typeFormation',
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'filiere',
        url: '/administration/filiere',
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'clientSession',
        url: '/administration/clientSession',
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'motifHorsCible',
        url: '/administration/motifHorsCible',
        profils: [Profil.ADMINISTRATEUR],
      },
      {
        name: 'region',
        url: '/administration/region',
        profils: [Profil.ADMINISTRATEUR],
      }
    ]
  },
  {
    title: true,
    name: 'Theme',
    profils: [Profil.ADMINISTRATEUR],
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop',
    profils: [Profil.ADMINISTRATEUR],
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    profils: [Profil.ADMINISTRATEUR],
    icon: 'icon-pencil'
  },
  {
    title: true,
    profils: [Profil.ADMINISTRATEUR],
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    profils: [Profil.ADMINISTRATEUR],
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    profils: [Profil.ADMINISTRATEUR],
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    profils: [Profil.ADMINISTRATEUR],
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    profils: [Profil.ADMINISTRATEUR],
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    profils: [Profil.ADMINISTRATEUR],
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    profils: [Profil.ADMINISTRATEUR],
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
    profils: [Profil.ADMINISTRATEUR],
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    profils: [Profil.ADMINISTRATEUR],
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    profils: [Profil.ADMINISTRATEUR],
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    profils: [Profil.ADMINISTRATEUR],
  }
];
