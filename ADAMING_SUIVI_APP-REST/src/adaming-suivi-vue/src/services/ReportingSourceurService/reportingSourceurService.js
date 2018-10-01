import Api from '@/services/Api'

export default {

  getListSourceur () {
    return Api().get('/ReportingSourceur/listeReportingSourceur').then(function (response) {
      return response
    })
  },
  getListReporting () {
    return Api().get('/ReportingSourceur/listeReporting').then(function (response) {
      return response
    })
  },
  rechercherReportingSourceur (sourceur, dateDebut, dateFin) {
    return Api().post('/ReportingSourceur/RechercheReportingSourceur', sourceur, dateDebut, dateFin).then(function (response) {
      return response
    })
  },
  getChart3 () {
    return Api().get('/ReportingSourceur/mapTechnologieParSourceur').then(function (response) {
      return response
    })
  },
  recherchemapTechnologieParSourceur (sourceur, dateDebut, dateFin) {
    return Api().post('/ReportingSourceur/RecherchemapTechnologieParSourceur', sourceur, dateDebut, dateFin).then(function (response) {
      return response
    })
  }

}
