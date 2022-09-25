<template>
  <div>

    <el-form :inline="true" :model="memberSkip" ref="skipForm">
      <el-form-item prop="cardNum">
        <el-input v-model="memberSkip.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="memberSkip.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="memberSkip.payType" placeholder="支付类型">
          <el-option v-for="(item,index) in payObj" :key="index" :label="item.name" :value="item.num"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" v-model="memberSkip.birthday" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="skip">查询</el-button>
        <el-button type="primary" @click="addFlag">新增</el-button>
        <el-button @click="handelReset('skipForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <tab :memberList = memberList :data="data" @addFlag="addFlag" @handelDel="handelDel"></tab>

    <pagination :currentPage="currentPage" :pageSizes="arr" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </pagination>

    <el-dialog :title="mtkTitle" :visible.sync="dialogVisible" width="30%">

      <el-form ref="cancels" :rules="mtkRules" :model="form" label-width="80px">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="form.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="birthday" label="会员生日">
          <el-date-picker value-format="yyyy-MM-dd" v-model="form.birthday" type="date" placeholder="会员生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="form.integral"></el-input>
        </el-form-item>
        <el-form-item prop="payType" label="支付类型">
          <el-select v-model="form.payType" placeholder="支付类型">
            <el-option v-for="(item,index) in payObj" :key="index" :label="item.name" :value="item.num"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="form.address"></el-input>
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
  getHandleMember,
  handleAdd,
  handleDels,
  handelInruire,
  handelcommpOk,
} from "../../../utils/member";
import tab from '../../../components/Tab.vue'
import pagination from '../../../components/pagination.vue'
import { payObj } from "../../../publicObj/payType";
export default {
  components:{
    tab,
    pagination,
  },
  data() {
    return {
      data:[
        {
          type:'cardNum',
          id:'1',
          name:'会员卡号',
        },
        {
          type:'name',
          id:'2',
          name:'会员姓名',
        },
        {
          type:'birthday',
          id:'3',
          name:'会员生日',
        },
        {
          type:'phone',
          id:'4',
          name:'手机号码',
        },
        {
          type:'integral',
          id:'5',
          name:'可用积分',
        },
        {
          type:'money',
          id:'6',
          name:'开卡金额',
        },
        {
          type:"payType",
          id:'7',
          name:'支付类型',
        },{
          type:'address',
          id:'8',
          name:'会员地址'
        }
      ],
      arr :[10, 20, 30, 40],
      payObj:payObj,
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
      memberSkip: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
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
    handelReset(skipForm) {
      this.$refs[skipForm].resetFields();
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
      this.$refs["cancels"].validate((valid) => {
        console.log(valid, "valid");
        if (!valid) return;
        console.log(this.form.id);
        this.form.id ? this.commpOk(this.id) : this.handleadd();
        this.dialogVisible = false;
      });
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
      } catch (error) {}
    },
    //取消清空表单
    cancel(cancels) {
      this.dialogVisible = false;
      this.handelReset(cancels);
    },
    //删除
    handelDel(id) {
      console.log(id,'ids');
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
.el-select {
  width: 120px;
}
</style>