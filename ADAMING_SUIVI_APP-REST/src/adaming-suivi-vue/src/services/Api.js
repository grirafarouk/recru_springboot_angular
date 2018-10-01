import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:9099/ADAMING_SUIVI_APP-REST'
  })
}
