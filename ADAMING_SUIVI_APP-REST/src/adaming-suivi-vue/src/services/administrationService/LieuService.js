import Api from '@/services/Api'

export default {

  getAllLieux () {
    return Api().get('/lieu').then(function (response) {
      return response
    })
  },
  addLieux (cg) {
    return Api().post('/lieu/add', cg).then(function (response) {
      return response
    })
  },
  updateLieux (cg) {
    return Api().post('/lieu/update', cg).then(function (response) {
      return response
    })
  }
}
