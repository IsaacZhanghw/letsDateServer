<template>
  <div class="fillcontain">
    <div>
      <el-button type="primary" icon='delete' size="small" @click='addArticle'>添加文章</el-button>
    </div>
    <div class="table_container">
      <el-table :data='list' border :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%">
        <el-table-column type="index" label="序号" align='center' width="50">
        </el-table-column>
        <el-table-column prop="openid" label="openid" align='center' width="280">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" align='center'>
        </el-table-column>
        <el-table-column prop="avatarUrl" label="头像" align='center'>
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column label="性别" align='center'>
          <template slot-scope="scope">
            <span>{{ scope.row.gender ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creatTime" label="创建时间" align='center' width="250" sortable>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ dateFormatAllTime(scope.row.creatTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align='center' label="操作" fixed="right">
          <template slot-scope='scope'>
            <el-button type="danger" icon='delete' size="small" @click='onDeleteMoney(scope.row,scope.$index)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change='handleCurrentChange' @size-change='handleSizeChange'>
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="添加文章" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormatAllTime } from "../utils/tools";
export default {
  name: "usersList",
  data() {
    return {
      list: [],
      total: 0,
      //需要给分页组件传的信息
      query: {
        name: "",
        current_page: 1, // 当前位于哪页
        page_size: 5 // 1页显示多少条
      },
      dialogVisible: false,
    };
  },
  created() {
    this.getUsersList();
  },
  methods: {
    dateFormatAllTime,
    getUsersList() {
      // 获取表格数据
      this.$axios("/api/getUsersList", {
        params: {
          name: this.query.name,
          current_page: this.query.current_page,
          page_size: this.query.page_size
        }
      }).then(res => {
        const resData = res.data;
        if (res.errcode) {
          return;
        }
        this.list = resData.list;
        this.total = resData.total;
      });
    },
    handleCurrentChange(current_page) {
      // 当前页
      this.query.current_page = current_page;
      this.getUsersList();
    },
    handleSizeChange(page_size) {
      // 切换size
      this.query.page_size = page_size;
      this.getUsersList();
    },
    addArticle() {
      this.dialogVisible = true
    }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>