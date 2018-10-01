import Api from '@/services/Api'

export default {
  getCandidatByID (candidatId) {
    return Api().get('/getcandidatById?id=' + candidatId).then(function (response) {
      return response
    })
  },
  downloadCVPdf (cand) {
    return Api().post('/CVPDF', cand, {responseType: 'blob'}).then(function (response) {
      return response
    })
  },
  getDisponibilite () {
    return Api().get('/refDisponibilite').then(function (response) {
      return response
    })
  }
}
