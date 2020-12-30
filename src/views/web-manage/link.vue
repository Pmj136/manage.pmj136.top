<template>
  <main class="jiu-page--link">
    <div class="tools">
      <el-input
          style="width: 220px"
          v-model.trim="params.keyword"
          placeholder="输入关键字搜索，回车键搜索"
          @keydown.native.enter="initData(false)"/>
      <el-button type="success" style="margin:0 10px 0 20px" icon="el-icon-refresh" @click="initData(true)">刷新</el-button>
      <el-button type="success" icon="el-icon-plus" @click="showDialog">添加友链</el-button>
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
          label="友链名称"
          prop="title">
      </el-table-column>
      <el-table-column
          label="友链网址"
          prop="link">
        <template v-slot="{row}">
          <a :href="row.link" target="_blank" style="color: #18a34b">
            {{ row.link }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button
              size="mini"
              type="danger"
              @click="delLink(row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrap" v-if="tableData.length>0">
      <el-pagination
          background
          :page-sizes="[10, 20]"
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
        title="添加友链"
        :visible.sync="dialogVisible">
      <el-form style="width: 100%" label-position="left" label-width="80px">
        <el-form-item label="友链名">
          <el-input ref="input" v-model="form.title" placeholder="请输入友链名"/>
        </el-form-item>
        <el-form-item label="网址">
          <el-input v-model="form.link" placeholder="请输入网址"/>
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
import {getLinkList, addLink, delLink} from "@/api/app"
import Msg from "@/utils/message";
import {freezeUser} from "@/api/user";

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
        link: "",
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
      this.page = 1
      this.size = 10
      if (refresh) this.params.keyword = ""
      this.fetchData()
    },
    fetchData() {
      this.isLoading = true
      getLinkList(this.params).then(res => {
        this.total = res.data.total
        this.tableData = res.data.records
      }).finally(() => {
        this.isLoading = false
      })
    },
    delLink(row) {
      this.$confirm("确认删除友链-" + row.title + "？", "提醒", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning"
      }).then(() => {
        delLink({id: row.id}).then(res => {
          Msg.tip(res.msg)
          this.initData(true)
        })
      }).catch(() => {
      });

    },
    showDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    add() {
      this.isAdd = true
      addLink(this.form).then(res => {
        this.dialogVisible = false
        this.title = ""
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
.jiu-page--link {
  padding: 16px 20px;
  box-sizing: border-box;
}
</style>