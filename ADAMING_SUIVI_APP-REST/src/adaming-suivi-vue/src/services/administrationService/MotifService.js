import Api from '@/services/Api'

export default {

  getAllMotifs () {
    return Api().get('/motifs').then(function (response) {
      return response
    })
  }
}
