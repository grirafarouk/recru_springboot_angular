import Api from '@/services/Api'

export default {

  getAllUtilisateurs () {
    return Api().get('/utilisateurs').then(function (response) {
      return response
    })
  }
}
