<template>
  <div>

    <el-form :inline="true" :model="commpodSkip" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="commpodSkip.code" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="commpodSkip.name" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="commpodSkip.supplierName" placeholder="选择供应商"></el-input>
      </el-form-item>
        <el-button type="primary" @click="skip">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="commpodList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="name" label="商品名称">
      </el-table-column>
      <el-table-column prop="code" label="商品编码">
      </el-table-column>
      <el-table-column prop="spec" label="商品规格">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="retailPrice" label="零售价">
      </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价">
      </el-table-column>
      </el-table-column>
      </el-table-column>
      <el-table-column prop="storageNum" label="库存数量">
      </el-table-column>
       <el-table-column prop="supplierName" label="供应商">
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
import { getHandleCommod } from "../../../utils/commodity";
import { payObj } from "../../../publicObj/payType";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      commpodSkip: {
        code:'',
        name:'',
        supplierName:'',
      },
      payObj: payObj,
      total: 0,
      commpodList: [],
    };
  },
  methods: {
    skip() {
      this.rendercommpod();
    },
    async rendercommpod() {
      const { data } = await getHandleCommod(
        this.currentPage,
        this.pageSize,
        this.commpodSkip
      );
      console.log(data);
      const { rows, total } = data;
      this.commpodList = rows;
      this.total = total;
    },
    handleSizeChange(size) {
      this.pageSize = size;
      console.log(size);
      this.rendercommpod();
    },
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.rendercommpod();
    },
  },

  created() {
    this.rendercommpod();
  },
};
</script>

<style>
.el-pagination {
  margin-top: 20px;
}
</style>