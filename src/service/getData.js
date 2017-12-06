import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取top10
 */

export const login = () => fetch('/user_action/login.json', {
  loginName: 'xuyg',
  password: '123456',
  mid: 'zatech'
});
