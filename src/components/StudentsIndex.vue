<template>
  <div>
    <MenuBar></MenuBar>
    <div class="col-12">
      <h1 class="pull-left col-4 text-left">Student List</h1>

      <div class="container" v-loading="loading">
        <el-table ref="multipleTable" :data="studentList" stripe>
          <el-table-column prop="id" min-width="50" sortable label="Id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" min-width="120" sortable label="Name" show-overflow-tooltip></el-table-column>
          <el-table-column prop="age" min-width="50" sortable label="Age" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="email"
            min-width="150"
            sortable
            label="Email"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column min-width="50" label="Actions" show-overflow-tooltip>
            <template slot-scope="students">
              <el-tooltip effect="light" content="Details" placement="bottom" class="mr-5">
                <a
                  class="el-icon-view pointer"
                  @click="id = students.row.id; detailsFormVisible = true"
                ></a>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <Details :detailsFormVisible.sync="detailsFormVisible" :id.sync="id"></Details>
  </div>
</template>

<script>
import MenuBar from "./menuBar.vue";
import Details from "./subComponents/studentDetails.vue";
export default {
  components: {
    MenuBar,
    Details
  },
  mounted() {
    this.getResultsPage();
  },
  data() {
    return {
      studentList: [],
      loading: false,
      error: "",
      detailsFormVisible: false,
      id: ""
    };
  },
  methods: {
    //-------------------Get data in page-------------------//
    getResultsPage() {
      var app = this;
      app.loading = true;
      app.$axios
        .get(app.$hostname + "/students" + app.$api_key)
        .then(
          response => (
            (app.studentList = response.data.students), (app.loading = false)
          )
        )
        .catch(error => {
          app.error = error;
          app.$message({
            message: "Student List cannot be Loaded.",
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
