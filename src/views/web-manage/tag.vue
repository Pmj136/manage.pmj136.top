<template>
  <main class="jiu-page--tag">
    <div class="tools">
      <el-input
          style="width: 220px"
          v-model.trim="params.keyword"
          placeholder="输入关键字搜索，回车键搜索"
          @keydown.native.enter="initData(false)"/>
      <el-button type="success" style="margin:0 10px 0 20px" icon="el-icon-refresh" @click="initData(true)">刷新</el-button>
      <el-button type="success" icon="el-icon-plus" @click="showDialog">添加标签</el-button>
    </div>
    <el-table
        stripe
        border
        size="medium"
        highlight-current-row
        :data="tableData"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        v-loading.lock="isLoading">
      <el-table-column
          label="标签ID"
          prop="id"
          sortable>
      </el-table-column>
      <el-table-column
          label="标签文字"
          prop="title">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row,$index}">
          <el-button
              v-if="row.state===1"
              size="mini"
              type="warning"
              @click="toggleTagState(row.id,0,$index)">停用
          </el-button>
          <el-button
              v-else
              size="mini"
              type="primary"
              @click="toggleTagState(row.id,1,$index)">启用
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
    <el-dialog
        width="400px"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        title="添加标签"
        :visible.sync="dialogVisible">
      <el-form style="width: 100%" label-position="left" label-width="80px">
        <el-form-item label="标签名">
          <el-input ref="input" v-model="form.title" placeholder="请输入标签名"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button :loading="isAdd" type="success" @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </main>
</template>
<script>
import {getTagList, addTag, updateTag} from "@/api/article"
import Msg from "@/utils/message"

export default {
  data() {
    return {
      dialogVisible: false,
      params: {
        page: 1,
        size: 10,
        keyword: "",
      },
      form: {
        title: "",
      },
      total: 0,
      tableData: [],
      isLoading: false,
      isAdd: false
    }
  },
  created() {
    this.initData(true)
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
      getTagList(this.params).then(res => {
        this.total = res.data.total
        this.tableData = res.data.records
      }).finally(() => {
        this.isLoading = false
      })
    },
    toggleTagState(id, state, index) {
      updateTag({id, state}).then(res => {
        this.tableData[index].state = state
        Msg.tip(res.msg)
      })
    },
    showDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    add() {
      this.isAdd = true
      addTag(this.form).then(res => {
        this.dialogVisible = false
        this.form.title = ""
        Msg.tip(res.msg)
        this.initData(true)
      }).catch(() => {
      }).finally(() => {
        this.isAdd = false
      })
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
.jiu-page--tag {
  padding: 16px 20px;
  box-sizing: border-box;
}
</style>