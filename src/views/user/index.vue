<template>
  <main class="jiu-page--user">
    <div class="tools">
      <el-input
          style="width: 220px"
          v-model.trim="params.keyword"
          placeholder="输入关键字搜索，回车键搜索"
          @keydown.native.enter="initData(false)"/>
      <el-button type="success" style="margin:0 10px 0 20px" icon="el-icon-refresh" @click="initData(true)">刷新</el-button>
    </div>
    <el-table
        border
        size="medium"
        highlight-current-row
        :data="tableData"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        v-loading.lock="isLoading">
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-form label-position="left" inline class="user-expand">
            <el-form-item label="邮箱">
              <span>{{ row.email || '暂未绑定' }}</span>
            </el-form-item>
            <el-form-item label="积分">
              <span>{{ row.integral }}</span>
            </el-form-item>
            <el-form-item label="GitHub">
              <span>{{ row.github_nick || '暂未绑定' }}</span>
            </el-form-item>
            <el-form-item label="关注量">
              <span>{{ row.notice_count }}</span>
            </el-form-item>
            <el-form-item label="钉钉">
              <span>{{ row.dingtalk_nick || '暂未绑定' }}</span>
            </el-form-item>
            <el-form-item label="粉丝量">
              <span>{{ row.fans_count }}</span>
            </el-form-item>
            <el-form-item label="Gitee">
              <span>{{ row.gitee_nick || '暂未绑定' }}</span>
            </el-form-item>
            <el-form-item label="已连续签到">
              <span>{{ row.signed_days }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ row.address || '暂未设置' }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="用户昵称"
          prop="nick"
          width="160px">
        <template v-slot="{row}">
          <a :href="'https://pmj136.top/user/'+row.id" target="_blank" style="color: #18a34b">
            {{ row.nick }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
          label="性别"
          prop="gender"
          width="90px"
          sortable
          :formatter="row=>gender[row.gender]">
      </el-table-column>
      <el-table-column
          label="用户角色"
          prop="role"
          width="110px"
          sortable>
        <template v-slot="{row}">
          <span v-if="row.role===1" style="color: #524b4b">普通用户</span>
          <span v-if="row.role===2" style="color: #4ea0b4">管理员</span>
          <span v-if="row.role===3" style="color: #ff4d51">超级管理员</span>
        </template>
      </el-table-column>
      <el-table-column
          label="注册时间"
          prop="create_at"
          width="170px"
          sortable>
      </el-table-column>
      <el-table-column
          label="账号状态"
          prop="state"
          :formatter="row=>status[row.state]">
      </el-table-column>
      <el-table-column label="操作" min-width="170px">
        <template v-slot="{row, $index}">
          <el-button
              v-if="row.role===1&&row.state===1"
              size="mini"
              type="primary"
              @click="showAlert({
              question:'确认设置用户 ' + row.nick + '，为管理员？',
              title:'设置提醒',
              type:'info',
              pro:'role',
              val:2,
              index:$index,
              id:row.id
              })">设为管理
          </el-button>
          <el-button
              v-if="row.role===2&&row.state===1"
              size="mini"
              type="info"
              @click="showAlert({
              question:'确认取消用户 ' + row.nick + ' 的管理员身份？',
              title:'设置提醒',
              pro:'role',
              val:1,
              index:$index,
              id:row.id
              })">取消管理
          </el-button>
          <el-button
              v-if="row.state===1"
              size="mini"
              type="danger"
              @click="freezeUser(row,$index)">冻结
          </el-button>
          <el-button
              v-if="row.state===0"
              size="mini"
              type="success"
              @click="showAlert({
              question:'确认解冻用户-' + row.nick + '？',
              title:'解冻提醒',
              pro:'state',
              val:1,
              type:'info',
              index:$index,
              id:row.id
              })">解冻
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrap" v-if="tableData.length>0">
      <el-pagination
          background
          :page-sizes="[10, 20, 50,100]"
          layout="total,prev, pager,next,sizes"
          :current-page="params.page"
          :page-size="params.size"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handlePageChange">
      </el-pagination>
    </div>
  </main>
</template>
<script>
import {getUserList, updateInfo, freezeUser} from "@/api/user"
import Msg from "@/utils/message"

export default {
  data() {
    return {
      gender: {
        0: '未知',
        1: '男',
        2: '女'
      },
      status: {
        1: '正常',
        0: '已冻结'
      },
      keyword: "",
      params: {
        page: 1,
        size: 10,
        keyword: "",
      },
      total: 0,
      tableData: [],
      isLoading: false,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    initData(refresh = false) {
      this.params.page = 1
      this.params.size = 10
      if (refresh) this.params.keyword = ""
      this.fetchData()
    },
    fetchData() {
      this.isLoading = true
      getUserList(this.params).then(res => {
        this.total = res.data.total
        this.tableData = res.data.records
      }).finally(() => {
        this.isLoading = false
      })
    },
    freezeUser(row, index) {
      this.$confirm("确认冻结用户-" + row.nick + "？", "冻结提醒", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning"
      }).then(() => {
        freezeUser({user_id: row.id}).then(res => {
          this.tableData[index].state = 0
        })
      }).catch(() => {
      });
    },
    showAlert({question, title, type = 'warning', pro, val, index, id}) {
      if (this.$store.state.user.info.id === id) {
        Msg.info("对自己好点哦");
        return
      }
      this.$confirm(question, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type
      }).then(() => {
        updateInfo({[pro]: val, id}).then(() => {
          this.tableData[index][pro] = val
        }).catch(e => {
          Msg.warn(e.msg)
        })
      }).catch(() => {
      });
    },
    handlePageChange(i) {
      this.params.page = i
      this.fetchData()
    },
    handleSizeChange(i) {
      this.params.size = i
      this.fetchData()
    },
  }
}
</script>
<style scoped lang="scss">
.jiu-page--user {
  padding: 20px;
  box-sizing: border-box;
}
</style>