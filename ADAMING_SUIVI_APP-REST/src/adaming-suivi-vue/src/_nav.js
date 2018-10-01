export default {
  items: [

    {
      name: 'Accueil',
      url: '/accueil',
      icon: 'icon-puzzle'
    },
    {
      name: 'Candidats',
      url: '/candidats',
      children: [
        {
          name: 'Nouveaux candidat',
          url: '/candidats/nouveaucandidat',
          icon: 'icon-puzzle'
        },
        {
          name: 'Liste nouveaux candidats',
          url: '/candidats/listenouveauxcandidats',
          icon: 'icon-puzzle'
        },
        {
          name: 'liste Tous candidats',
          url: '/candidats/listeTouscandidats',
          icon: 'icon-puzzle'
        },
        {
          name: 'liste candidats A Relancer',
          url: '/candidats/listecandidatsARelancer',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Entretien',
      url: '/entretien',
      icon: 'icon-puzzle'
    },
    {
      name: 'Session formation',
      url: '/sessionFormation',
      children: [
        {
          name: 'Session formation en cours',
          url: '/sessionFormation/sessionFormationsEncours',
          icon: 'icon-puzzle'
        },
        {
          name: 'Session formation clotures',
          url: '/sessionFormation/sessionFormationsclotures',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Reporting',
      url: '/Reporting',
      icon: 'icon-puzzle'
    },
    {
      name: 'Reporting Sourceur',
      url: '/ReportingSourceur',
      icon: 'icon-puzzle'
    },
    {
      name: 'Administration',
      url: '/administration',
      children: [
        {
          name: 'Competence',
          url: '/administration/competence',
          icon: 'icon-puzzle'
        },
        {
          name: 'Lieux',
          url: '/administration/lieux',
          icon: 'icon-puzzle'
        },
        {
          name: 'Utilisateurs',
          url: '/administration/utilisateur',
          icon: 'icon-puzzle'
        },
        {
          name: 'OrigineCV',
          url: '/administration/origineCV',
          icon: 'icon-puzzle'
        },
        {
          name: 'Technologie',
          url: '/administration/technologie',
          icon: 'icon-puzzle'
        },
        {
          name: 'TypeFormation',
          url: '/administration/typeFormation',
          icon: 'icon-puzzle'
        },
        {
          name: 'Formation',
          url: '/administration/formation',
          icon: 'icon-puzzle'
        },
        {
          name: 'Client Session',
          url: '/administration/clientSession',
          icon: 'icon-puzzle'
        },
        {
          name: 'Motif Hors Cible',
          url: '/administration/motifhorscible',
          icon: 'icon-puzzle'
        },
        {
          name: 'Region',
          url: '/administration/region',
          icon: 'icon-puzzle'
        }
      ]
    }
  ]
}
