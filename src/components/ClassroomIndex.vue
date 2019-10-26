<template>
  <div>
    <MenuBar></MenuBar>
    <div class="col-12">
      <h1 class="pull-left col-4 text-left">Classroom List</h1>

      <div class="container" v-loading="loading">
        <el-table ref="multipleTable" :data="classroomList" stripe>
          <el-table-column prop="id" min-width="150" sortable label="Id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" min-width="150" sortable label="Name" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="layout"
            min-width="150"
            sortable
            label="Layout"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="size" min-width="150" sortable label="Size" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import MenuBar from "./menuBar.vue";
export default {
  components: {
    MenuBar
  },
  mounted() {
    this.getResultsPage();
  },
  data() {
    return {
      classroomList: [],
      loading: false,
      errors: ""
    };
  },
  methods: {
    //-------------------Get data in page-------------------//
    getResultsPage() {
      var app = this;
      app.loading = true;
      app.$axios
        .get(app.$hostname + "/classrooms" + app.$api_key)
        .then(
          response => (
            (app.classroomList = response.data.classrooms),
            (app.loading = false)
          )
        )
        .catch(error => {
          app.error = error;
          app.$message({
            message: "Classroom List cannot be Loaded.",
            type: "error"
          });
          app.loading = false;
        })
        .finally(() => (app.loading = false));
    }
    //-------------------End of Get data in page-------------------//
  }
};
</script>
