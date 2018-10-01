import Api from '@/services/Api'

export default {

  getAllTechnologies () {
    return Api().get('/technologie').then(function (response) {
      return response
    })
  },
  getTechnologiesByLibelle () {
    return Api().get('/technologie/Libelle').then(function (response) {
      return response
    })
  }
}
