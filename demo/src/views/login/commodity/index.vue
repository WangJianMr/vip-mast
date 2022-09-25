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
        <el-input v-model="commpodSkip.supplierName" placeholder="选择供应商" @focus="supplierNameShow(0)"></el-input>
      </el-form-item>
      <el-button type="primary" @click="skip">查询</el-button>
      <el-button type="primary" @click="addShow">新增</el-button>
      <el-button @click="handelReset('skipForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <tab :memberList=commpodList :data="data" @handelDel="handelDel" @addFlag="addFlag"></tab>
    <!-- 分页 -->
    <pagination :currentPage="currentPage" :pageSizes="arr" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </pagination>
    <!-- 模态框 -->
    <el-dialog title="选择供应商" :visible.sync="supplierNameShows" width="30%">
      <el-input v-model="supplierNamess" placeholder="选择供应商" style="width:250px"></el-input>
      <el-button type="primary" class="ml" @click="insSkip">查询</el-button>
      <el-table :data="suppList" border style="width: 100%" height="350" @row-click="rowClick">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="供应商名称" width="223">
        </el-table-column>
        <el-table-column prop="linkman" label="联系人">
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :page-size="pageSizes" :current-page="currentPages" :total="totals" @size-change="handleSizeChanges" @current-change="handleCurrentChanges">
      </el-pagination>
    </el-dialog>

    <!-- 添加模态框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">

      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="form.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="form.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="form.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="form.storageNum"></el-input>
        </el-form-item>
        <el-form-item prop="supplierName" label="供应商">
          <el-input v-model="form.supplierName" placeholder="选择供应商" @focus="supplierNameShow(1)"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="handleOk('form')">确 定</el-button>
      </span>
    </el-dialog>
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
export default {
  components: {
    tab,
    pagination,
  },
  data() {
    return {
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
      dialogVisible: false,
      supplierNamess: "",
      supplierNameShows: false,
      arr: [10, 20, 30, 40],
      data: [
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
        retailOrice: [
          { required: true, message: "请输入零售价", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
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
    addShow() {
      this.title = "新增商品";
      this.dialogVisible = true;
    },
    //新增确定
    handleOk(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.id) {
            this.commOk(this.form.id)
          } else {
            this.handeladd();
          }
          this.rendercommpod()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增取消
    resetForm(formName) {
      this.handelReset(formName);
    },
    //新增
    async handeladd() {
      const add = await handleAdd();
      console.log(add);
    },
    //编辑
    addFlag(id) {
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