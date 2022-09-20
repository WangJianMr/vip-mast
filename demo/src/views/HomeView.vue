<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import {login} from "../utils/api";

export default {
  name: "HomeView",
  components: {
  },
  data() {
    return {
      form:{
        username:'admin',
        password:'admin'
      },
    }
  },
  created() {
    login(this.form).then(res=>{
      console.log(res);
    })
  },
};
</script>
