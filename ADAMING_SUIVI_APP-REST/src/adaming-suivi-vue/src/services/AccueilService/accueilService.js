import Api from '@/services/Api'

export default {

  getChart () {
    return Api().get('/accueil/map').then(function (response) {
      return response
    })
  },
  getNombreCVRrelancer () {
    return Api().get('/accueil/ReportingChargeRelance').then(function (response) {
      return response
    })
  },
  getSessionreporting () {
    return Api().get('/accueil/Sessionreporting').then(function (response) {
      return response
    })
  },
  getSourceurTechnologies () {
    return Api().get('/accueil/SourceurTechnologies').then(function (response) {
      return response
    })
  }

}
