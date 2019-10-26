<template>
  <div>
    <MenuBar></MenuBar>
    <div class="col-12">
      <h1 class="pull-left col-4 text-left">Subject List</h1>

      <div class="container" v-loading="loading">
        <el-table ref="multipleTable" :data="subjectList" stripe>
          <el-table-column prop="id" min-width="150" sortable label="Id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" min-width="150" sortable label="Name" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="teacher"
            min-width="150"
            sortable
            label="Teacher"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="credits"
            min-width="150"
            sortable
            label="Credits"
            show-overflow-tooltip
          ></el-table-column>
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
      subjectList: [],
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
        .get(app.$hostname + "/subjects" + app.$api_key)
        .then(
          response => (
            (app.subjectList = response.data.subjects), (app.loading = false)
          )
        )
        .catch(error => {
          app.error = error;
          app.$message({
            message: "Subject List cannot be Loaded.",
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
