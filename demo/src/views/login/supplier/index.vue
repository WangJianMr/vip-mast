<template>
  <div>
    <el-form :inline="true" :model="supplierSkip" class="demo-form-inline" ref="skipForm">
      <el-form-item prop="cardNum">
        <el-input v-model="supplierSkip.cardNum" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input v-model="supplierSkip.linkman" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="supplierSkip.mobile" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="skip">查询</el-button>
        <el-button type="primary" @click="addFlag">新增</el-button>
        <el-button @click="handelReset('skipForm')">重置</el-button>
      </el-form-item>
    </el-form>

    
    <tab :memberList = suppleList :data="data" @addFlag="addFlag" @handelDel="handelDel"></tab>


    <pagination :currentPage="currentPage" :pageSizes="arr" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </pagination>

    <el-dialog :title="mtkTitle" :visible.sync="dialogVisible" width="500px">

      <el-form ref="cancels" :rules="mtkRules" :model="form" label-width="100px">
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="form.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('cancels')">取 消</el-button>
        <el-button type="primary" @click="addAncompOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getHandleSuppler,
  getHandleMtkOk,
  getHandleDel,
  getHandleSkip,
  getHandleComp,
} from "../../../utils/supplier";
import tab from '../../../components/Tab.vue'
import pagination from '../../../components/pagination.vue'
export default {
  components:{
    tab,
    pagination,
  },
  data() {
    return {
       data:[
        {
          type:'name',
          id:'1',
          name:'供应商名称',
        },
        {
          type:'linkman',
          id:'2',
          name:'联系人',
        },
        {
          type:'mobile',
          id:'3',
          name:'联系电话',
        },
        {
          type:'remark',
          id:'4',
          name:'备注',
        },
      ],
      arr: [10, 20, 30, 40],
      mtkTitle: "",
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      supplierSkip: {
        name: "",
        linkman: "",
        mobile: "",
      },
      suppleList: [],
      form: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      mtkRules: {
        linkman: [
          { required: true, message: "请输入会员卡号", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入会员姓名", trigger: "blur" }],
        payType: [
          { required: true, message: "请输入支付类型", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //查询
    skip() {
      this.renderSupple();
    },
    //获取列表
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
    //每页条数
    handleSizeChange(size) {
      this.pageSize = size;
      console.log(size);
      this.renderSupple();
    },
    //当前页数
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.renderSupple();
    },
    //重置表单
    handelReset(skipForm) {
      this.$refs[skipForm].resetFields();
    },
    //添加/编辑确认
    addAncompOk() {
      this.$refs["cancels"].validate((valid) => {
        console.log(valid, "valid");
        if (!valid) return;
        console.log(this.form.id);
        this.form.id ? this.commpOk(this.id) : this.handleadd();
        this.dialogVisible = false;
      });
    },
    //触发模态框
    addFlag(id) {
      this.dialogVisible = true;
      if (typeof id === "number") {
        this.mtkTitle = "编辑会员";
        this.id = id;
        this.inruire(id);
      } else {
        this.mtkTitle = "添加会员";
        this.form = {
          cardNum: "",
          name: "",
          birthday: "",
          phone: "",
          money: "",
          integral: "",
          payType: "",
          address: "",
        };
      }
    },
    //添加成功
    async handleadd() {
      try {
        const add = await getHandleMtkOk(this.form);
        this.$message({
          message: "恭喜你，添加成功",
          type: "success",
        });
        this.renderSupple();
      } catch (error) {}
    },
    //查询单个(接口
    async inruire(id) {
      try {
        const ire = await getHandleSkip(id);
        this.form = ire.data;
      } catch (error) {}
    },
    //编辑成功
    async commpOk(id) {
      try {
        const com = await getHandleComp(id);
        this.$message({
          message: "恭喜你，编辑成功",
          type: "success",
        });
        console.log(com);
        this.renderSupple();
      } catch (error) {}
    },
    //删除
    handelDel(id) {
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
      getHandleDel(id);
      this.renderSupple();
    },
    //取消清空表单
    cancel(cancels) {
      this.dialogVisible = false;
      this.handelReset(cancels);
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