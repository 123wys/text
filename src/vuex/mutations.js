/**
 * Created by za-renqiang on 2017/11/23.
 */

const CHANGE_APPSOURCE = 'CHANGE_APPSOURCE'
const CHANGE_HEADERTAPOS = 'CHANGE_HEADERTAPOS'
const CHANGE_APPSOURCELIST = 'CHANGE_APPSOURCELIST'

export default {
  [CHANGE_APPSOURCE](state, str) { //修改appSource
    state.appSource = str;
  },

  [CHANGE_HEADERTAPOS](state, str) { //修改headerTapOs
    state.headerTapOs = str;
  },

  [CHANGE_APPSOURCELIST](state, arr) { //修改appSourceList
    state.appSourceList = arr;
  },
}
