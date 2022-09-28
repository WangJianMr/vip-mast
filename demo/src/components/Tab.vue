<template>
  <div>

    <el-table :data="memberList" height="580" border style="width: 100%">
      <template v-for="item in data">
        <el-table-column v-if="item.prop && item.prop!=='active'&& item.prop!=='function'" :type="item.prop" :label="item.name" v-bind="item">
        </el-table-column>
        <el-table-column v-else-if="!item.prop" :prop="item.type" :label="item.name" v-bind="item">
        </el-table-column> 
        <!-- <el-table-column v-else-if="item.prop=='function'" :prop="item.type" :label="item.name" v-bind="item">
          <template v-slot="scope">
            <span v-html="item.callback && item.callback(scope.row)"></span>
          </template>
        </el-table-column> -->

        <el-table-column label="操作" v-else-if="item.prop && item.prop==='active'">
          <template slot-scope="scope">
            <el-button size="mini" @click="compAndel(scope.row.id,acitves.text)" v-for="(acitves,index) in item.children" :key="index" :type="acitves.type">{{acitves.text}}</el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>

  </div>
</template>

<script>
import { payObj } from "../publicObj/payType";
export default {
  props: {
    memberList: {
      type: Array,
    },
    data: {
      type: Array,
      defnult: () => [],
    },
  },
  data() {
    return {
      payObj: payObj,
    };
  },
  methods: {
    compAndel(id, text) {
      if (text == "编辑") {
        this.$emit("addFlag", id);
      } else {
        this.$emit("handelDel", id);
      }
    },
  },
  created() {
    console.log(this.data,'data');
    console.log(this.memberList,'memberList');
  },
};
</script>

<style>
</style>