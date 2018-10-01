import Api from '@/services/Api'

export default {

  getCVRelanceByCharge (charge) {
    return Api().get('/accueil/CandidatParCharge?idcharge=' + charge).then(function (response) {
      return response
    })
  },
  getCandidatSession (session) {
    return Api().get('/accueil/CandidatSession?idsession=' + session).then(function (response) {
      return response
    })
  }
}
