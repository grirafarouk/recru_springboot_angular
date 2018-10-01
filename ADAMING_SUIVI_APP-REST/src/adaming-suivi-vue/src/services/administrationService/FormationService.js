import Api from '@/services/Api'

export default {

  getAllFormations () {
    return Api().get('/formation').then(function (response) {
      return response
    })
  }
}
