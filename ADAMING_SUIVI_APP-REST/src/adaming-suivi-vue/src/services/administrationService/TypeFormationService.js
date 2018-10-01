import Api from '@/services/Api'

export default {

  getAllTypeFormations () {
    return Api().get('/typeformation').then(function (response) {
      return response
    })
  }
}
