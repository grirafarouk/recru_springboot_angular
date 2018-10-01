import Api from '@/services/Api'

export default {
  getSessionsFormationencours () {
    return Api().get('/formation/listeformationencours').then(function (response) {
      return response
    })
  },
  getSessionsFormationClotures () {
    return Api().get('/formation/listeformationclotures').then(function (response) {
      return response
    })
  },
  getAllFormation () {
    return Api().get('/formation').then(function (response) {
      return response
    })
  },
  getSessionsFormation () {
    return Api().get('/sessionsformations').then(function (response) {
      return response
    })
  },
  rechercherSessionFormationencours (formation, session) {
    return Api().post('/formation/formationencours', formation, session).then(function (response) {
      return response
    })
  },
  rechercherSessionFormationclotures (formation, session) {
    return Api().post('/formation/formationclotures', formation, session).then(function (response) {
      return response
    })
  },
  rechercherSessionFormation (formation, session) {
    return Api().post('/formation/listeformationparsession', formation, session).then(function (response) {
      return response
    })
  },

  NombreParticipants (session) {
    return Api().post('/sessionsformations/nbreparticipants', session).then(function (response) {
      return response
    })
  },
  getSessionByID (id) {
    return Api().get('/sessionsformations/CandidatParSession?id=' + id).then(function (response) {
      return response
    })
  },
  getCandidatBySession (idsession) {
    return Api().post('/sessionsformations/listeCandidats', idsession).then(function (response) {
      return response
    })
  }
}
