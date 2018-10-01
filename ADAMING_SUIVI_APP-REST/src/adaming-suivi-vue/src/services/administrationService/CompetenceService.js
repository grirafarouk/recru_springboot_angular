import Api from '@/services/Api'

export default {
  getCompetences () {
    return Api().get('/competence/all').then(function (response) {
      return response
    })
  },
  deleteCompetences (id) {
    return Api().delete('/competence/' + id).then(function (response) {
      return response
    })
  },

  addCompetences (cg) {
    return Api().post('/competence/add', cg).then(function (response) {
      return response
    })
  },
  updateCompetences (cg) {
    return Api().post('/competence/update', cg).then(function (response) {
      return response
    })
  }
}
