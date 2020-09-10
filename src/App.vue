<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="valueChange"/>
    <a-button type="primary" @click="addList">添加事项</a-button>

    <a-list bordered :dataSource="statusChangeList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{checkedChange(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeList(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{leftNum}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="status==='all' ? 'primary' : 'default'" @click="statusChange('all')">全部</a-button>
          <a-button :type="status==='undone' ? 'primary' : 'default'" @click="statusChange('undone')">未完成</a-button>
          <a-button :type="status==='done' ? 'primary' : 'default'" @click="statusChange('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
/* 按需导入vuex组件 */
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  /* 获取数据 */
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    /* 映射为computed属性 */
    ...mapState(['list', 'inputValue', 'nextId', 'status']),
    ...mapGetters(['leftNum', 'statusChangeList'])
  },
  methods: {
    /* 映射为methods函数 */
    ...mapMutations(['getLists', 'inputChange']),
    ...mapActions(['getList']),
    /* 输入框值改变触发 */
    valueChange (e) {
      this.$store.commit('inputChange', e.target.value)
    },
    /* 删除列表数据 */
    removeList (id) {
      this.$store.commit('removeLists', id)
    },
    /* 增加列表数据 */
    addList () {
      if (this.inputValue.trim().length <= 0) {
        this.$message.warning('请输入todo')
      } else {
        this.$store.commit('addLists')
      }
    },
    /* 复选框点击触发 */
    checkedChange (e, id) {
      const params = {
        id: id,
        done: e.target.checked
      }
      this.$store.commit('checkChange', params)
    },
    /* 清除已完成项目 */
    clear () {
      this.$store.commit('clearDone')
    },
    // 完成状态切换
    statusChange (status) {
      this.$store.commit('statusListChange', status)
    }
  }
}
</script>

<style scoped>
  #app {
    padding: 10px;
  }

  .my_ipt {
    width: 500px;
    margin-right: 10px;
  }

  .dt_list {
    width: 500px;
    margin-top: 10px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
