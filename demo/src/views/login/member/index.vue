<template>
  <div>

    <el-form :inline="true" :model="memberSkip" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="memberSkip.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="memberSkip.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="memberSkip.payType" placeholder="支付类型">
          <el-option v-for="(item,index) in payObj" :key="index" :label="item.name" :value="item.num"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker value-format="yyyy-MM-dd" v-model="memberSkip.birthday" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="skip">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="memberList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号">
      </el-table-column>
      <el-table-column prop="name" label="会员姓名" width="100">
      </el-table-column>
      <el-table-column prop="birthday" label="会员生日">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分">
      </el-table-column>
      <el-table-column prop="money" label="开卡金额">
      </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          {{scope.row.payType | payTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="200">
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
import { getHandleMember } from "../../../utils/member";
import { payObj } from "../../../publicObj/payType";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      memberSkip: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      payObj: payObj,
      total: 0,
      memberList: [],
    };
  },
  filters: {
    payTypeFilter(val) {
      let names = payObj.find((item) => item.num === val);
      return names.name;
    },
  },
  methods: {
    skip() {
      this.renderMember();
    },
    async renderMember() {
      const { data } = await getHandleMember(
        this.currentPage,
        this.pageSize,
        this.memberSkip
      );
      const { rows, total } = data;
      this.memberList = rows;
      this.total = total;
    },
    handleSizeChange(size) {
      this.pageSize = size;
      console.log(size);
      this.renderMember();
    },
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.renderMember();
    },
  },

  created() {
    this.renderMember();
  },
};
</script>

<style>
.el-pagination {
  margin-top: 20px;
}
</style>