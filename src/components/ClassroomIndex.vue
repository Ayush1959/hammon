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
          <el-table-column min-width="100" label="Actions" show-overflow-tooltip>
            <template slot-scope="students">
              <el-tooltip effect="light" content="Details" placement="bottom" class="mr-5">
                <a
                  class="el-icon-view pointer"
                  @click="id = students.row.id; detailsFormVisible = true"
                ></a>
              </el-tooltip>
              <el-tooltip effect="light" content="Assign" placement="bottom" class="mr-5">
                <a
                  class="el-icon-thumb pointer"
                  @click="id = students.row.id; assignFormVisible = true"
                ></a>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <Details :detailsFormVisible.sync="detailsFormVisible" :id.sync="id"></Details>
    <Assign :assignFormVisible.sync="assignFormVisible" :id.sync="id"></Assign>
  </div>
</template>

<script>
import MenuBar from "./menuBar.vue";
import Details from "./subComponents/classroomDetails.vue";
import Assign from "./subComponents/assignSubject.vue";

export default {
  components: {
    MenuBar,
    Details,
    Assign
  },
  mounted() {
    this.getResultsPage();
  },
  data() {
    return {
      classroomList: [],
      loading: false,
      error: "",
      detailsFormVisible: false,
      assignFormVisible: false,
      id: ""
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
