import Api from '@/services/Api'

export default {
  getClients () {
    return Api().get('/clientSession').then(function (response) {
      return response
    })
  },
  addClients (cg) {
    return Api().post('/clientSession/add', cg).then(function (response) {
      return response
    })
  }
}
