<template>
  <div>

    <el-form :inline="true" :model="commpodSkip" class="demo-form-inline" ref="skipForm">
      <el-form-item prop="code">
        <el-input v-model="commpodSkip.code" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="commpodSkip.name" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input v-model="commpodSkip.supplierName" placeholder="选择供应商" @focus="addShow(0)"></el-input>
      </el-form-item>
      <el-button type="primary" @click="handleOk">查询</el-button>
      <el-button type="primary" @click="addShow(1)">新增</el-button>
      <el-button @click="handelReset('skipForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <tab :memberList=commpodList :data="data" @handelDel="handelDel" @addFlag="addFlag"></tab>
    <!-- 分页 -->
    <pagination :currentPage="currentPage" :pageSizes="arr" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </pagination>

    <di :di.sync='dialogVisible' :flagNum="flagNum">
      <template v-slot:inp="scope">
        <el-input v-model="supplierNamess" placeholder="选择供应商" style="width:250px"></el-input>
        <el-button type="primary" class="ml" @click="insSkip">查询</el-button>
      </template>
      <template v-slot:table="scope">
        <tab :memberList="suppList" :data="datas"></tab>
      </template>
    </di>

    <di :di.sync='dialogVisible' :flagNum="flagNum" @handleOk="handleOk" @resetForm="resetForm" :title="title">
      <template v-slot:forms="scope">
        <fo v-model.sync="form" :rules="rules" :dinForm="dinForm" ref="formName" @vals="vals"></fo>
      </template>
    </di>
  </div>
</template>

<script>
import {
  getHandleCommod,
  handleAdd,
  handleDels,
  handelInruire,
  handelcommpOk,
  handelSupplierName,
} from "../../../utils/commodity";
import { payObj } from "../../../publicObj/payType";
import tab from "../../../components/Tab.vue";
import pagination from "../../../components/pagination.vue";
import di from "../../../components/di.vue";
import fo from "../../../components/formss.vue";
export default {
  components: {
    tab,
    pagination,
    di,
    fo,
  },
  data() {
    return {
      datas: [
        {
          prop: "index",
          id: "0",
          name: "序号",
          width: 50,
        },
        {
          type: "name",
          id: "1",
          name: "供应商名称",
        },
        {
          type: "linkman",
          id: "2",
          name: "联系人",
        },
      ],
      title: "",
      form: {
        name: "",
        code: "",
        spec: "",
        retailPrice: 0,
        purchasePrice: 0,
        storageNum: 0,
        supplierName: "",
      },
      dinForm: [
        {
          type: "input",
          prop: "name",
          label: "商品名称",
        },
        {
          type: "input",
          prop: "code",
          label: "商品编码",
        },
        {
          type: "input",
          prop: "spec",
          label: "商品规格",
        },
        {
          type: "input",
          prop: "retailPrice",
          label: "零售价",
        },
        {
          type: "input",
          prop: "purchasePrice",
          label: "进货价",
        },
        {
          type: "input",
          prop: "storageNum",
          label: "库存数量",
        },
        {
          type: "input",
          prop: "supplierName",
          label: "供应商",
          flag: true,
        },
      ],
      dialogVisible: false,
      supplierNamess: "",
      supplierNameShows: false,
      arr: [10, 20, 30, 40],
      data: [
        {
          prop: "index",
          id: "0",
          name: "序号",
          width: 50,
        },
        {
          type: "name",
          id: "1",
          name: "商品名称",
        },
        {
          type: "code",
          id: "2",
          name: "商品编号",
        },
        {
          type: "spec",
          id: "3",
          name: "商品规格",
        },
        {
          type: "retailPrice",
          id: "4",
          name: "零售价",
        },
        {
          type: "purchasePrice",
          id: "5",
          name: "进货价",
        },
        {
          type: "storageNum",
          id: "6",
          name: "库存数量",
        },
        {
          type: "supplierName",
          id: "7",
          name: "供应商",
        },
        {
          prop: "active",
          id: "9",
          name: "操作",
          children: [
            {
              type: "primary",
              text: "编辑",
            },
            {
              type: "danger",
              text: "删除",
            },
          ],
        },
      ],
      currentPage: 1,
      pageSize: 10,
      commpodSkip: {
        code: "",
        name: "",
        supplierName: "",
      },
      payObj: payObj,
      total: 0,
      commpodList: [],
      currentPages: 1,
      pageSizes: 10,
      suppList: [],
      totals: 0,
      num: "",
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入商品编码", trigger: "blur" }],
        retailPrice: [
          { required: true, message: "请输入零售价", trigger: "blur" },
        ],
      },
      flag: null,
      flagNum: null,
    };
  },
  methods: {
    vals(val) {
      this.flag = val;
    },
    handleSizeChanges(val) {
      this.pageSizes = val;
      this.supplierNameList();
    },
    handleCurrentChanges(val) {
      this.currentPages = val;
      this.supplierNameList();
    },
    //查询
    skip() {
      this.rendercommpod();
    },
    //所有数据
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
    //每页条数
    handleSizeChange(size) {
      this.pageSize = size;
      console.log(size);
      this.rendercommpod();
    },
    //当前页数
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.rendercommpod();
    },
    //模态框内数据
    async supplierNameList(data) {
      const supp = await handelSupplierName(
        this.currentPages,
        this.pageSizes,
        data
      );
      this.totals = supp.data.total;
      this.suppList = supp.data.rows;
    },
    //模态框内查询
    insSkip() {
      console.log(132);
      this.supplierNameList(this.supplierNamess);
    },
    //删除
    handelDel(id) {
      console.log(id, "ids");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.dels(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除接口
    dels(id) {
      handleDels(id);
      this.rendercommpod();
    },
    //重置表单
    handelReset(skipForm) {
      this.$refs[skipForm].resetFields();
    },
    //供应商模态框
    supplierNameShow(num) {
      this.num = num;
      this.supplierNameShows = true;
      this.supplierNameList();
    },
    // 模态框内查询
    rowClick(row) {
      console.log(row);
      if (this.num === 0) {
        this.commpodSkip.supplierName = row.name;
      } else {
        this.form.supplierName = row.name;
      }

      this.supplierNameShows = false;
    },
    //新增
    addShow(num) {
      this.flagNum = num;
      console.log(num, "num");
      console.log(this.flagNum);
      if (num == 0) {
        this.flagNum = 0;
        this.dialogVisible = true;
        this.supplierNameList();
      } else {
        this.title = "新增商品";
        this.dialogVisible = true;
        this.form = {
          name: "",
          code: "",
          spec: "",
          retailPrice: 0,
          purchasePrice: 0,
          storageNum: 0,
          supplierName: "",
        };
      }
    },
    //新增确定
    handleOk() {
      this.$refs["formName"].refdd();
      if (!this.flag) return;
      if (this.form.id) {
        this.commOk(this.form.id);
      } else {
        this.handeladd();
      }
      this.rendercommpod();

      // this.vals()
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    //新增取消
    resetForm() {
      this.$refs["formName"].delsd();
    },
    //新增
    async handeladd() {
      const add = await handleAdd();
      console.log(add);
    },
    //编辑
    addFlag(id, num) {
      this.flagNum = 1;
      this.title = "编辑商品";
      this.ruire(id);
      this.dialogVisible = true;
    },
    //编辑查询
    async ruire(id) {
      const re = await handelInruire(id);
      console.log(re);
      this.form = re.data;
    },
    //编辑完成
    async commOk(id) {
      const com = await handelcommpOk(id);
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
.ml {
  margin-left: 10px;
}
</style>