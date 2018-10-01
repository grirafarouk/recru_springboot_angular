import Api from '@/services/Api'

export default {
  auth () {

  },
  getUsers () {
    return Api().get('/api/user/users', {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    }).then(function (response) {
      return response
    })
  },
  deleteUser (id) {
    return Api().delete('/api/user/user/' + id, {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    }).then(function (response) {
      return response
    })
  },
  addUser (user) {
    return Api().post('/api/user/user', user, {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    }).then(function (response) {
      return response
    })
  },
  updateUser (user) {
    return Api().put('/api/user/user', user, {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    }).then(function (response) {
      return response
    })
  },
  getUserNotAffected () {
    return Api().get('/api/user/employeesnotaffected', {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    }).then(function (response) {
      return response
    })
  }

}
