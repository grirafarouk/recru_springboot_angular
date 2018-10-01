import Api from '@/services/Api'

export default {

  getAllOrigines () {
    return Api().get('/origine').then(function (response) {
      return response
    })
  }
}
