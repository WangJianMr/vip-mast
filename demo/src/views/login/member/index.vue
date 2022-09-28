<template>
  <div>
    <queryForm v-model.sync="memberSkip" :quer="quer" ref="formSkip">
      <template v-slot:query='scope'>
        <el-button type="primary" @click="skip">查询</el-button>
        <el-button type="primary" @click="addFlag">新增</el-button>
        <el-button @click="handelReset">重置</el-button>
      </template>
    </queryForm>
    <!-- 表格 -->
    <tab :memberList="memberList" :data="data" @addFlag="addFlag" @handelDel="handelDel"></tab>

    <pagination :currentPage="currentPage" :pageSizes="arr" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </pagination>

    <dialogs @addAncompOk="addAncompOk" :dialogVisible.sync="dialogVisible" :mtkTitle="mtkTitle" v-model.sync="form" :dialogForm="dialogForm" :mtkRules="mtkRules"></dialogs>
  </div>
</template>

<script>
import {
  getHandleMember,
  handleAdd,
  handleDels,
  handelInruire,
  handelcommpOk,
} from "../../../utils/member";
import tab from "../../../components/Tab.vue";
import pagination from "../../../components/pagination.vue";
import { payObj } from "../../../publicObj/payType";
import queryForm from "../../../components/queryForm.vue";
import dialogs from "../../../components/dialogs.vue";
let pay = {
  1: "现金",
  2: "微信",
  3: "支付宝",
  4: "银行卡",
};
export default {
  components: {
    tab,
    pagination,
    queryForm,
    dialogs,
  },
  data() {
    return {
      memberSkip: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      quer: [
        {
          type: "input",
          prop: "cardNum",
          placeholder: "会员卡号",
        },
        {
          type: "input",
          prop: "name",
          placeholder: "会员名字",
        },
        {
          type: "select",
          prop: "payType",
          placeholder: "支付类型",
          children: [
            {
              name: "现金",
              num: "1",
            },
            {
              name: "微信",
              num: "2",
            },
            {
              name: "支付宝",
              num: "3",
            },
            {
              name: "银行卡",
              num: "4",
            },
          ],
        },
        {
          type: "date",
          prop: "birthday",
          placeholder: "选择日期",
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
          type: "cardNum",
          id: "1",
          name: "会员卡号",
        },
        {
          type: "name",
          id: "2",
          name: "会员姓名",
        },
        {
          type: "birthday",
          id: "3",
          name: "会员生日",
        },
        {
          type: "phone",
          id: "4",
          name: "手机号码",
        },
        {
          type: "integral",
          id: "5",
          name: "可用积分",
        },
        {
          type: "money",
          id: "6",
          name: "开卡金额",
        },
        {
          type: "payType",
          id: "7",
          name: "支付类型",
          formatter: (cellValue) => {
            return pay[cellValue.payType];
          },
        },
        {
          type: "address",
          id: "8",
          name: "会员地址",
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
      dialogForm: [
        {
          type: "input",
          prop: "cardNum",
          id: "1",
          name: "会员卡号",
          width: "width:300px",
        },
        {
          type: "input",
          prop: "name",
          id: "2",
          name: "会员姓名",
          width: "width:300px",
        },
        {
          type: "date",
          prop: "birthday",
          id: "3",
          name: "会员生日",
        },
        {
          type: "input",
          prop: "phone",
          id: "4",
          name: "手机号码",
          width: "width:300px",
        },
        {
          type: "input",
          prop: "integral",
          id: "5",
          name: "可用积分",
          const: 0,
          width: "width:300px",
        },
        {
          type: "input",
          prop: "money",
          id: "6",
          name: "开卡金额",
          const: 0,
          width: "width:300px",
        },
        {
          type: "select",
          prop: "payType",
          id: "7",
          name: "支付类型",
          children: [
            {
              name: "现金",
              num: "1",
            },
            {
              name: "微信",
              num: "2",
            },
            {
              name: "支付宝",
              num: "3",
            },
            {
              name: "银行卡",
              num: "4",
            },
          ],
        },
        {
          type: "textarea",
          prop: "address",
          id: "8",
          name: "会员地址",
          width: "width:300px",
        },
      ],
      form: {
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: "",
        integral: "",
        payType: "",
        address: "",
      },
      arr: [10, 20, 30, 40],
      payObj: payObj,
      mtkTitle: "",
      id: "",
      form: {
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: "",
        integral: "",
        payType: "",
        address: "",
      },
      mtkRules: {
        cardNum: [
          { required: true, message: "请输入会员卡号", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入会员姓名", trigger: "blur" }],
        payType: [
          { required: true, message: "请输入支付类型", trigger: "blur" },
        ],
      },
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,

      total: 0,
      memberList: [],
    };
  },

  methods: {
    //查询
    skip() {
      this.renderMember();
    },
    //获取全部数据
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
    //每页数量
    handleSizeChange(size) {
      this.pageSize = size;
      console.log(size);
      this.renderMember();
    },
    //当前页数
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.renderMember();
    },
    //重置表单
    handelReset() {
      this.$refs["formSkip"].handelResetst();
    },
    // //触发模态框
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
    //添加/编辑确认
    addAncompOk() {
      this.form.id ? this.commpOk(this.id) : this.handleadd();
      this.dialogVisible = false;
    },
    //编辑成功
    async commpOk(id) {
      try {
        const com = await handelcommpOk(id);
        this.$message({
          message: "恭喜你，编辑成功",
          type: "success",
        });
        console.log(com);
        this.renderMember();
      } catch (error) {}
    },
    //添加成功
    async handleadd() {
      try {
        const add = await handleAdd(this.form);
        this.$message({
          message: "恭喜你，添加成功",
          type: "success",
        });
        this.renderMember();
        this.dialogVisible=false
      } catch (error) {}
    },
    //取消清空表单
    cancel(cancels) {
      this.dialogVisible = false;
      this.handelReset(cancels);
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
      this.renderMember();
    },
    //查询单个(接口
    async inruire(id) {
      try {
        const ire = await handelInruire(id);
        this.form = ire.data;
      } catch (error) {}
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