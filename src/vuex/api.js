import axios from 'axios'
import {getUrlParam} from '../libs/utils'
// 获取token
const token = getUrlParam('token')
// 设置全局携带
axios.defaults.baseURL = 'https://www.erplus.co'
axios.defaults.headers.common = {
  'Authorization': 'Bearer ' + token
}
export default {
  getShareData () {
    return axios.get('https://www.erplus.co/checkinWeb/getShareData')
  },
  fetchProfile () {
    return axios.get('api/v1/profile')
  }
}
