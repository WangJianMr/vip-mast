<template>
  <div>

    <el-form :inline="true" :model="staffSkip" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="staffSkip.code" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="staffSkip.name" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="staffSkip.supplierName" placeholder="选择供应商"></el-input>
      </el-form-item>
      <el-button type="primary" @click="skip">查询</el-button>
      <el-button type="primary">新增</el-button>
      <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="staffList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="username" label="账号">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column prop="salary" label="薪酬">
      </el-table-column>
      <el-table-column prop="entryDate" label="入职时间">
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
import { getHandleStaff } from "../../../utils/staff";
import { payObj } from "../../../publicObj/payType";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      staffSkip: {
        code: "",
        name: "",
        supplierName: "",
      },
      payObj: payObj,
      total: 0,
      staffList: [],
    };
  },
  methods: {
    skip() {
      this.getHandleStaffs();
    },
    async getHandleStaffs() {
      const { data } = await getHandleStaff(
        this.currentPage,
        this.pageSize,
        this.staffSkip
      );
      console.log(data);
      const { rows, total } = data;
      this.staffList = rows;
      this.total = total;
    },
    handleSizeChange(size) {
      this.pageSize = size;
      console.log(size);
      this.getHandleStaffs();
    },
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.getHandleStaffs();
    },
  },

  created() {
    this.getHandleStaffs();
  },
};
</script>

<style>
.el-pagination {
  margin-top: 20px;
}
</style>