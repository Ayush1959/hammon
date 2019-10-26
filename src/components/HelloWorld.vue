<template>
  <div>
    <div class="col-md-2">
          <MenuBar></MenuBar></div>
          <div class="col-md-8">

    <h1>{{ msg }}</h1>

    <h1>Hellooooo</h1>

    <a>
      GGGGG
      <router-link to="/">
        <span>Go Home</span>
      </router-link>
    </a>

          </div>
  </div>
</template>

<script>
import MenuBar from "./menuBar.vue";
export default {
  components: {
    MenuBar
  },
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>
