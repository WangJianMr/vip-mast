<template>
  <div>

    <el-form :inline="true" :model="staffSkip" class="demo-form-inline" ref="skipForm">
      <el-form-item prop="code">
        <el-input v-model="staffSkip.code" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="staffSkip.name" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input v-model="staffSkip.supplierName" placeholder="选择供应商"></el-input>
      </el-form-item>
      <el-button type="primary" @click="skip">查询</el-button>
      <el-button type="primary" @click="addFlag">新增</el-button>
      <el-button @click="handelReset('skipForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-table :data="staffList" height="380" border style="width: 100%">
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
          <el-button size="mini" @click="addFlag(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handelDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <tab :memberList = staffList :data="data" @addFlag="addFlag" @handelDel="handelDel"></tab>

    <pagination :currentPage="currentPage" :pageSizes="arr" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </pagination>

    <el-dialog :title="mtkTitle" :visible.sync="dialogVisible" width="500px">

      <el-form ref="cancels" :rules="mtkRules" :model="form" label-width="100px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input type="textarea" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary ">
          <el-input type="textarea" v-model="form.salary"></el-input>
        </el-form-item>
        <el-form-item prop="entryDate" label="入职时间">
          <el-date-picker value-format="yyyy-MM-dd" v-model="form.entryDate" type="date" placeholder="会员生日">
          </el-date-picker>
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
  getHandleStaff,
  getHandleMtkOk,
  getHandleDel,
  getHandleSkip,
  getHandleComp,
} from "../../../utils/staff";
import { payObj } from "../../../publicObj/payType";
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
          type:'username',
          id:'1',
          name:'账号',
        },
        {
          type:'name',
          id:'2',
          name:'姓名',
        },
        {
          type:'age',
          id:'3',
          name:'年龄',
        },
        {
          type:'mobile',
          id:'4',
          name:'电话',
        },
        {
          type:'salary',
          id:'5',
          name:'薪酬',
        },
        {
          type:'entryDate',
          id:'6',
          name:'入职时间',
        },
      ],
      arr :[10, 20, 30, 40],
      mtkTitle: "",
      dialogVisible: false,
      form: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      mtkRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
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
    //查询
    skip() {
      this.getHandleStaffs();
    },
    //获取全部
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
    //每页条数
    handleSizeChange(size) {
      this.pageSize = size;
      console.log(size);
      this.getHandleStaffs();
    },
    //当前页数
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.getHandleStaffs();
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
        this.getHandleStaffs();
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
        this.getHandleStaffs();
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
     this.getHandleStaffs();
    },
    //取消清空表单
    cancel(cancels) {
      this.dialogVisible = false;
      this.handelReset(cancels);
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