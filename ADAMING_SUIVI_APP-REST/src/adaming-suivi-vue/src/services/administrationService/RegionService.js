import Api from '@/services/Api'

export default {

  getAllRegions () {
    return Api().get('/region').then(function (response) {
      return response
    })
  }
}
