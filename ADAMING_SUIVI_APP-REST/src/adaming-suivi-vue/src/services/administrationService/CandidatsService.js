import Api from '@/services/Api'

export default {

  getAllNouveauxCandidats () {
    return Api().get('/nouveauxcandidats').then(function (response) {
      return response
    })
  },
  getAllCandidats () {
    return Api().get('/nouveauxcandidats').then(function (response) {
      return response
    })
  }
}
