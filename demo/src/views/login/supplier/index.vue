<template>
  <div>

    <queryForms v-model.sync="supplierSkip" :quer="quer" ref="skipForm">
      <template v-slot:query="scope">
        <el-button type="primary" @click="skip">查询</el-button>
        <el-button type="primary" @click="addFlag">新增</el-button>
        <el-button @click="handelReset">重置</el-button>
      </template>
    </queryForms>

    <tab :memberList="suppleList" :data="data" @addFlag="addFlag" @handelDel="handelDel"></tab>

    <pagination :currentPage="currentPage" :pageSizes="arr" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </pagination>

    <dialogs v-model.sync="forms" :mtkRules="mtkRules" :dialogForm="dialogForm" :mtkTitle="mtkTitle" :dialogVisible.sync="dialogVisible" @addAncompOk="addAncompOk" ></dialogs>
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
import tab from "../../../components/Tab.vue";
import pagination from "../../../components/pagination.vue";
import queryForms from "../../../components/queryForm.vue";
import dialogs from "../../../components/dialogs.vue";
export default {
  components: {
    tab,
    pagination,
    queryForms,
    dialogs,
  },
  data() {
    return {
      supplierSkip: {
        name: "",
        linkman: "",
        mobile: "",
      },
      dialogForm: [
        {
          type: "input",
          prop: "name",
          name: "供应商名称",
          width: "width:300px",
        },
        {
          type: "input",
          prop: "linkman",
          name: "联系人",
          width: "width:300px",
        },
        {
          type: "input",
          prop: "mobile",
          name: "联系电话",
          width: "width:300px",
        },
        {
          type: "textarea",
          prop: "mobile",
          name: "备注",
          width: "width:300px",
        },
      ],
      quer: [
        {
          type: "input",
          prop: "name",
          placeholder: "供应商名称",
        },
        {
          type: "input",
          prop: "linkman",
          placeholder: "联系人",
        },
        {
          type: "input",
          prop: "mobile",
          placeholder: "联系电话",
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
          type: "name",
          id: "1",
          name: "供应商名称",
        },
        {
          type: "linkman",
          id: "2",
          name: "联系人",
        },
        {
          type: "mobile",
          id: "3",
          name: "联系电话",
          renderHeader: (h, { column, $index }) => {
            console.log(column.label);
            return h("h3", column.label, {});
          },
        },
        {
          type: "remark",
          id: "4",
          name: "备注",
          prop: "function",
          callback: (row) => {
            return `<a href="https://www.baidu.com">${row.remark}</a>`;
          },
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
      currentPage: 1,
      pageSize: 10,
      total: 0,

      suppleList: [],
      forms: {
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
    handelReset() {
      this.$refs["skipForm"].handelResetst();
    },
    //添加/编辑确认
    addAncompOk() {
      this.forms.id ? this.commpOk(this.id) : this.handleadd();
      this.dialogVisible = false;
    },
    //触发模态框
    addFlag(id) {
      this.dialogVisible = true;
      if (typeof id === "number") {
        this.mtkTitle = "编辑供应商";
        this.id = id;
        this.inruire(id);
      } else {
        this.mtkTitle = "添加供应商";
        this.forms = {
          name: "",
          linkman: "",
          mobile: "",
          remark: "",
        };
      }
    },
    //添加成功
    async handleadd() {
      try {
        const add = await getHandleMtkOk(this.forms);
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
        this.forms = ire.data;
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