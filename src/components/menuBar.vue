<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
    <ul class="navbar-nav">
      <li class="nav-item" @click="menuClick">
        <a class="nav-link">
          <router-link :class="{'active': url == 'students'}" to="/students">Students</router-link>
        </a>
      </li>
      <li class="nav-item" @click="menuClick">
        <a class="nav-link">
          <router-link :class="{'active': url == 'subjects'}" to="/subjects">Subjects</router-link>
        </a>
      </li>
      <li class="nav-item" @click="menuClick">
        <a class="nav-link">
          <router-link :class="{'active': url == 'classrooms'}" to="/classrooms">Classrooms</router-link>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: function() {
    return {
      url: 0,
      full_url: 0,
      details_full_url: 0,
      isActiveMaster: false,
      isActivePipeline: false,
      isActiveReport: false,
      mouse_over: false
    };
  },
  mounted() {
    var app = this;
    app.url = window.location.href.substr(
      window.location.href.lastIndexOf("/") + 1
    );
    var absoluteURL = window.location.href;
    var splittedStr = absoluteURL.split("/");
    app.full_url = splittedStr[splittedStr.length - 2];
    app.details_full_url = splittedStr[splittedStr.length - 3];
  },
  methods: {
    toggleChange() {
      this.toggle = !this.toggle;
    },
    menuClick() {
      this.url = window.location.href.substr(
        window.location.href.lastIndexOf("/") + 1
      );
    }
  }
};
</script>

<style scoped>
.active {
  color: #ff0000 !important;
}
</style>

