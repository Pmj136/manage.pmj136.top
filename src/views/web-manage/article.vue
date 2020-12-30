<template>
  <main class="jiu-page--article">
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
      <el-table-column
          label="文章标题"
          prop="title">
        <template v-slot="{row}">
          <a :href="'https://pmj136.top/article/'+row.id" target="_blank" class="col-title">
            {{ row.title }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
          label="发布者"
          prop="user_nick">
        <template v-slot="{row}">
          <a :href="'https://pmj136.top/user/'+row.user_id" target="_blank" style="color: #18a34b">
            {{ row.nick }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
          label="发布时间"
          prop="release_time"
          sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button
              size="mini"
              type="danger"
              @click="handleIllegal(row)">违规处理
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
import {getArticleList} from "@/api/article";
import Msg from "@/utils/message"

export default {
  data() {
    return {
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
    this.initData(true)
  },
  methods: {
    handleIllegal() {
      Msg.info("开发中")
    },
    initData(refresh = false) {
      this.params.page = 1
      this.params.size = 10
      if (refresh) this.params.keyword = ""
      this.fetchData()
    },
    fetchData() {
      this.isLoading = true
      getArticleList(this.params).then(res => {
        this.total = res.data.total
        this.tableData = res.data.records
      }).finally(() => {
        this.isLoading = false
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
.jiu-page--article {
  padding: 20px;
  box-sizing: border-box;
}

.col-title {
  color: #18a34b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>