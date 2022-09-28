<template>
  <div>
    <queryForm v-model.sync="staffSkip" :quer="quer" ref="skipForm">
      <template v-slot:query="scope">
        <el-button type="primary" @click="skip">查询</el-button>
        <el-button type="primary" @click="addFlag">新增</el-button>
        <el-button @click="handelReset">重置</el-button>
      </template>
    </queryForm>

    <tab :memberList=staffList :data="data" @addFlag="addFlag" @handelDel="handelDel"></tab>

    <pagination :currentPage="currentPage" :pageSizes="arr" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </pagination>

    <dialogs v-model.sync="form" :dialogVisible.sync="dialogVisible" :mtkTitle="mtkTitle" :mtkRules="mtkRules" :dialogForm="dialogForm" @addAncompOk="addAncompOk"></dialogs>
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
import tab from "../../../components/Tab.vue";
import pagination from "../../../components/pagination.vue";
import queryForm from "../../../components/queryForm.vue";
import dialogs from "../../../components/dialogs.vue";
export default {
  components: {
    tab,
    pagination,
    queryForm,
    dialogs,
  },
  data() {
    return {
      dialogForm: [
        {
          type: "input",
          prop: "username",
          width: "width:300px",
          name: "账号",
        },
        {
          type: "input",
          prop: "name",
          width: "width:300px",
          name: "姓名",
        },
        {
          type: "input",
          prop: "age",
          width: "width:300px",
          name: "年龄",
        },
        {
          type: "input",
          prop: "mobile",
          width: "width:300px",
          name: "电话",
        },
        {
          type: "input",
          prop: "salary",
          width: "width:300px",
          name: "薪酬",
        },
        {
          type: "date",
          prop: "entryDate",
          name: "入职时间",
        },
      ],
      staffSkip: {
        code: "",
        name: "",
        supplierName: "",
      },
      quer: [
        {
          type: "input",
          prop: "code",
          placeholder: "账号",
        },
        {
          type: "input",
          prop: "name",
          placeholder: "姓名",
        },
        {
          type: "slot",
          slot_name: "query",
        },
      ],
      data: [
        {
          prop: "index",
          id: "0",
          name: "序号",
          width: 50,
        },
        {
          type: "username",
          id: "1",
          name: "账号",
        },
        {
          type: "name",
          id: "2",
          name: "姓名",
        },
        {
          type: "age",
          id: "3",
          name: "年龄",
        },
        {
          type: "mobile",
          id: "4",
          name: "电话",
        },
        {
          type: "salary",
          id: "5",
          name: "薪酬",
        },
        {
          type: "entryDate",
          id: "6",
          name: "入职时间",
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
      arr: [10, 20, 30, 40],
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
    handelReset() {
      this.$refs["skipForm"].handelResetst();
    },
    //添加/编辑确认
    addAncompOk() {
        this.form.id ? this.commpOk(this.id) : this.handleadd();
        this.dialogVisible = false;
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