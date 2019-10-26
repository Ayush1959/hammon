<template>
  <div>
    <MenuBar></MenuBar>
    <div class="col-12">
      <h1 class="pull-left col-4 text-left">Registration List</h1>

      <div class="container" v-loading="loading">
        <el-table ref="multipleTable" :data="RegistrationList" stripe>
          <el-table-column prop="id" min-width="50" sortable label="Id" show-overflow-tooltip></el-table-column>
          <el-table-column min-width="120" label="Student" show-overflow-tooltip>
            <template slot-scope="student">{{ findStudentName(student.row.student) }}</template>
          </el-table-column>
          <el-table-column min-width="120" label="Subject" show-overflow-tooltip>
            <template slot-scope="subject">{{ findSubjectName(subject.row.subject) }}</template>
          </el-table-column>
          <el-table-column min-width="50" label="Actions" show-overflow-tooltip>
            <template slot-scope="students">
              <el-tooltip effect="light" content="Delete" placement="bottom" class="mr-5">
                <a
                  class="el-icon-close pointer"
                  @click="id = students.row.id; deleteFormVisible = true"
                ></a>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      class="delete-collection-popup"
      title="Delete Registration"
      :visible.sync="deleteFormVisible"
      custom-class="el-dialog col-xs-10 col-sm-6 col-md-5 col-lg-4"
    >
      <p class="mt-15">Are you sure you want to delete the Registration?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteFormVisible = false">Cancel</el-button>
        <el-button type="danger" @click="delete_registration()">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- <Details :detailsFormVisible.sync="detailsFormVisible" :id.sync="id"></Details> -->
  </div>
</template>

<script>
import MenuBar from "./menuBar.vue";
// import Details from "./subComponents/studentDetails.vue";
export default {
  components: {
    MenuBar
    // Details
  },
  mounted() {
    this.getStudentResults();
    this.getSubjectResults();
    this.getResultsPage();
  },
  data() {
    return {
      RegistrationList: [],
      studentList: [],
      subjectList: [],
      loading: false,
      error: "",
      deleteFormVisible: false,
      id: ""
    };
  },
  methods: {
    delete_registration() {
      var app = this;
      app.loading = true;
      app.$axios
        .delete(app.$hostname + "/registration/" + app.id + app.$api_keys)
        .then(
          response => (
            app.$message({
              message: response.data.message,
              type: "error"
            }),
            app.getResultsPage(),
            (app.deleteFormVisible = false),
            // app.studentDetails = response.data
            (app.loading = false)
          )
        )
        .catch(error => {
          app.error = error;
          app.$message({
            message: "Student Details cannot be Loaded.",
            type: "error"
          });
          app.loading = false;
        })
        .finally(() => (app.loading = false));
    },
    findStudentName(id) {
      var result = this.studentList.find(x => x.id === id);
      if (result) {
        return result.name;
      } else {
        return result;
      }
    },
    findSubjectName(id) {
      var result = this.subjectList.find(x => x.id === id);
      if (result) {
        return result.name;
      } else {
        return result;
      }
    },
    //-------------------Get data in page-------------------//
    getSubjectResults() {
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
    },
    //-------------------Get data in page-------------------//
    getStudentResults() {
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
    },
    //-------------------End of Get data in page-------------------//
    //-------------------Get data in page-------------------//
    getResultsPage() {
      var app = this;
      app.loading = true;
      app.$axios
        .get(app.$hostname + "/registration" + app.$api_key)
        .then(
          response => (
            (app.RegistrationList = response.data.registrations),
            (app.loading = false)
          )
        )
        .catch(error => {
          app.error = error;
          app.$message({
            message: "Registrations List cannot be Loaded.",
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
