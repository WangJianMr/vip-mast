<template>
  <div>
    <el-form :inline="true" :model="supplierSkip" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="supplierSkip.cardNum" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="supplierSkip.linkman" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="supplierSkip.mobile" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="skip">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="suppleList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="name" label="供应商名称">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人" width="100">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getHandleSuppler } from "../../../utils/supplier";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      supplierSkip: {
        name: "",
        linkman: "",
        mobile: "",
      },
      suppleList: [],
    };
  },
  methods: {
    skip() {
      this.renderSupple();
    },
    async renderSupple() {
      const { data } = await getHandleSuppler(
        this.currentPage,
        this.pageSize,
        this.supplierSkip
      );
      const { rows, total } = data;
      this.suppleList = rows;
      this.total = total;
    },
        handleSizeChange(size) {
      this.pageSize = size;
      console.log(size);
      this.renderSupple();
    },
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.renderSupple();
    },
  },
  created() {
    this.renderSupple();
  },
};
</script>

<style>
.el-pagination {
  margin-top: 20px;
}
</style>