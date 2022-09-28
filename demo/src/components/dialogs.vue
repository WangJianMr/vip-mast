<template>
  <div>
    <el-dialog :title="mtkTitle" :visible.sync="Visible" width="30%">
      <el-form ref="cancels" :model="value" label-width="80px" :rules="mtkRules">
        <template v-for="(item,index) in dialogForm">
          <el-form-item v-if="item.type==='input'" :label="item.name" :prop="item.prop">
            <el-input v-model="value[item.prop]" :value="item.const" :style="item.width"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type==='date'" :label="item.name" :prop="item.prop">
            <el-date-picker value-format="yyyy-MM-dd" v-model="value[item.prop]" :type="item.type"></el-date-picker>
          </el-form-item>
          <el-form-item v-if="item.type==='select'" :label="item.name" :prop="item.prop">
            <el-select v-model="value[item.prop]">
              <el-option v-for="(ele,i) in item.children" :key="i" :label="ele.name" :value="ele.num" :placeholder="item.placeholder"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="item.type==='textarea'" :label="item.name" :prop="item.prop">
            <el-input v-model="value[item.prop]" :type="item.type" :style="item.width"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible=false">取 消</el-button>
        <el-button type="primary" @click="addAncompOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    mtkTitle: {
      type: String,
      default: "新增会员",
    },
    dialogForm: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
    mtkRules: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    Visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        console.log(val);
        this.$emit("update:dialogVisible", val);
      },
    },
  },
  methods: {
    addAncompOk() {
      this.$refs["cancels"].validate((valid) => {
        if (!valid) return;
        this.$emit("addAncompOk");
      });
    },
  },
};
</script>

<style>
</style>