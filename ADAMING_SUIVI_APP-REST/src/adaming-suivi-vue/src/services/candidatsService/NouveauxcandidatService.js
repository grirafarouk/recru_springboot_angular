import Api from '@/services/Api'

export default {
  getNouveauxCandidats (page, size) {
    return Api().get('/nouveauxcandidats/' + page + '/' + size).then(function (response) {
      return response
    })
  },
  rechercheNouveauxCandidats (cand) {
    return Api().post('/RechercheNouveauxcandidats', cand).then(function (response) {
      return response
    })
  },
  getCandidatsArelancer () {
    return Api().get('/candidatsarelancer').then(function (response) {
      return response
    })
  },
  getTousCandidats (page, size) {
    return Api().get('/candidats/' + page + '/' + size).then(function (response) {
      return response
    })
  },
  getEntretien (page, size) {
    return Api().get('/candidatavecentretien/' + page + '/' + size).then(function (response) {
      return response
    })
  },
  rechercherNouveauxCandidats (candidat) {
    return Api().post('/RechercheNouveauxcandidats', candidat).then(function (response) {
      return response
    })
  },
  getNouveauxCandidatsExcel (cand) {
    return Api().post('/RechercheNouveauxcandidats', cand).then(function (response) {
      return response
    })
  },
  MaxLength () {
    return Api().get('/nberNouveauxCandidats').then(function (response) {
      return response
    })
  },
  CandidatMaxLength () {
    return Api().get('/nberCandidats').then(function (response) {
      return response
    })
  }
}
