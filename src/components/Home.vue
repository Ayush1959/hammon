<template>
   <!-- <div class="container"> -->
    <div>
      <MenuBar></MenuBar>
      <div class="col-2">
        <span><router-link to="/"><span>Subjects</span></router-link></span>
      </div>
      <div class="col-10 col-offset-2">
        
        <h1>
          <el-menu>
          <el-menu-item><router-link to="/">
        <span>Subjects</span>
      </router-link></el-menu-item>
      <el-menu-item><router-link to="/home">
        <span>Home</span>
      </router-link></el-menu-item>
    </el-menu>
        </h1>
        
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import MenuBar from "./menuBar.vue";
export default {
  components: {
    MenuBar
  },
  name: "Home",
  props: {
    msg: String
  }
};
</script>
