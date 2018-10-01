import Api from '@/services/Api'

export default {

  getAllSessions () {
    return Api().get('/sessionsformations').then(function (response) {
      return response
    })
  }
}
