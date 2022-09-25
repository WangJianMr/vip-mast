<template>
  <div>

    <el-table :data="memberList" height="580" border style="width: 100%">

      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column v-for="item in data" :key="item.id" :prop="item.type" :label="item.name">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="addFlag(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handelDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { payObj } from "../publicObj/payType";
export default {
  props: {
    memberList:{
       type: Array,
    },
    data: {
      type: Array,
      defnult: [],
    },
  },
  data() {
    return {
      payObj: payObj,
    };
  },

  filters: {
    payTypeFilter(val) {
      let names = payObj.find((item) => item.num === val);
      return names.name;
    },
  },
  methods: {
    addFlag(id) {
      console.log(id, "id");
      this.$emit("addFlag", id);
    },
    handelDel(id) {
      console.log(id, "id");
      this.$emit("handelDel", id);
    },
  },
};
</script>

<style>
</style>