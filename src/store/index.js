import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 列表数据 */
    list: [],
    /* 输入框数据 */
    inputValue: 'aaa',
    /* 后续数据ID值 */
    nextId: 5,
    /* 状态值 */
    status: 'all'
  },
  mutations: {
    /* 获取列表数据 */
    getLists (state, list) {
      state.list = list
    },
    /* 输入框数据改变 */
    inputChange (state, list) {
      state.inputValue = list
    },
    /* 删除列表数据 */
    removeLists (state, id) {
      const index = state.list.findIndex(item => {
        return item.id === id
      })
      state.list.splice(index, 1)
    },
    /* 增加列表数据 */
    addLists (state) {
      const newObj = { id: state.nextId, done: false, info: state.inputValue }
      state.list.push(newObj)
      state.nextId++
      state.inputValue = ''
    },
    /* 复选框点击触发 */
    checkChange (state, params) {
      const index = state.list.findIndex(item => {
        return item.id === params.id
      })
      state.list[index].done = params.done
    },
    /* 清除已完成项目 */
    clearDone (state) {
      state.list = state.list.filter(item => {
        return item.done === false
      })
    },
    /* 完成状态切换 */
    statusListChange (state, status) {
      state.status = status
    }
  },
  actions: {
    /* 异步从静态资源目录获取list数据 */
    getList (context) {
      axios.get('/list.json').then(data => {
        context.commit('getLists', data.data)
      })
    }
  },
  modules: {
  },
  getters: {
    /* 包装计算剩余的未完成个数 */
    leftNum (state) {
      return state.list.filter(item => {
        return item.done === false
      }).length
    },
    /* 包装状态切换后的列表数据 */
    statusChangeList (state) {
      if (state.status === 'all') {
        return state.list
      } else if (state.status === 'done') {
        return state.list.filter(item => {
          return item.done === true
        })
      } else if (state.status === 'undone') {
        return state.list.filter(item => {
          return item.done === false
        })
      }
    }
  }
})
