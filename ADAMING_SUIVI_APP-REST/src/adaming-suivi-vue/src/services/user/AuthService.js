import Api from '@/services/Api'
import { NPN_ENABLED } from 'constants'

export default {
  data: () => {
    return { jwtToken: null }
  },

  login (user) {
    return Api().post('/login', user)
  },
  saveToken (jwt) {
    window.localStorage.setItem('token', jwt)
  },
  loadToken () {
    var vm = this
    vm.jwtToken = window.localStorage.getItem('token')
  },
  logout () {
    var vm = this
    vm.jwtToken = null
    window.localStorage.removeItem('token')
  },
  getAcceuil () {
    var vm = this
    if (vm.jwtToken == null) vm.loadToken()
    return Api().get('/api/modules', {
      headers: {
        Authorization: vm.jwtToken
      }
    })
  },
  resetPassword (user) {
    return Api().post('/reset', user)
  },
  forgetPassword (user) {
    return Api().get('api/user/account/reset_password/init/' + user)
  },
  reinstallPassword (newUser) {
    return Api().post('api/user/account/reset_password', newUser)
  },
  findByLogin (login) {
    return Api().get('/utilisateurs/login/' + login, {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    })
  },
  findListCategoriesByLogin (login) {
    return Api().get('api/categoriesofConnectedUser/' + login, {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    })
  }

}
