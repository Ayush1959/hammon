<template>
  <div>
    <el-dialog
      title="Classroom Details"
      :visible="detailsFormVisible"
      @close="closeDialog"
      v-loading="loading"
      custom-class="col-xs-10 col-md-8 col-lg-7"
      width="40%"
    >
      <div class="pull-left w-100" v-if="classroomDetails">
        <div class="row">
          <div class="col-8 text-left">
            <h5>Name:{{ classroomDetails.name }}</h5>
          </div>
          <div class="col-4 text-left">
            <h5>Size:{{ classroomDetails.size }}</h5>
          </div>
          <div class="col-8 text-left">
            <h5>Layout:{{ classroomDetails.layout }}</h5>
          </div>
          <div class="col-4 text-left">
            <h5>Id:{{ classroomDetails.id }}</h5>
          </div>
          <div class="col-10 text-left" v-if="classroomDetails.subject">
            <h5>Subject:{{ findSubjectName(classroomDetails.subject) }}</h5>
          </div>
        </div>
        <div class="row" v-if="classroomDetails.subject">
          <div class="col-8 text-left">
            <el-select
              filterable
              v-model="student"
              class="w-100"
              name="student"
              id="student"
              placeholder="Select Student *"
            >
              <el-option
                v-for="student in studentList"
                :key="student.id"
                :label="student.name"
                :value="student.id"
              ></el-option>
            </el-select>
          </div>
          <div class="col-4 text-left">
            <el-button
              type="primary"
              @click="assignStudent()"
              :disabled="errors.any() || !isComplete"
            >Assign</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      classroomDetails: "",
      loading: false,
      studentList: [],
      student: ""
    };
  },
  props: {
    detailsFormVisible: {
      required: true
    },
    id: {
      required: true
    }
  },
  mounted() {
    var app = this;
    app.getSubjectResults();
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
  watch: {
    detailsFormVisible: function() {
      var app = this;
      if (app.detailsFormVisible) {
        if (app.id) {
          app.getClassroomDetails();
        }
      }
    }
  },
  methods: {
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
    assignStudent() {
      var app = this;
      app.loading = true;
      let formData = new FormData();
      formData.append("subject", app.classroomDetails.subject);
      formData.append("student", app.student);
      app.$axios
        .post(app.$hostname + "/registration" + app.$api_key, formData)
        .then(function(response) {
          app.loading = false;
          if (response.data.subject == app.subject) {
            app.$message({
              message: "Student Assigned Sucessfully.",
              type: "success"
            });
            app.closeDialog();
          } else {
            app.$message({
              message: "Student cannot be Assigned.",
              type: "error"
            });
          }
        })
        .catch(error => {
          app.error = error;
          app.$message({
            message: "Student cannot be Assigned.",
            type: "error"
          });
          app.loading = false;
        })
        .finally(() => (app.loading = false));
    },
    //------Get classroom Details-----------------//
    getClassroomDetails() {
      var app = this;
      app.loading = true;
      app.$axios
        .get(app.$hostname + "/classrooms/" + app.id + app.$api_keys)
        .then(
          response => (
            (app.classroomDetails = response.data), (app.loading = false)
          )
        )
        .catch(error => {
          app.error = error;
          app.$message({
            message: "classroom Details cannot be Loaded.",
            type: "error"
          });
          app.loading = false;
        })
        .finally(() => (app.loading = false));
    },
    //------End of Get classroom Details-----------//
    //------Close detail popupp--------------//
    closeDialog() {
      this.student = "";
      this.$emit("update:id", "");
      this.$emit("update:detailsFormVisible", false);
    }
    //------end of Close detail popupp-------//
  },
  computed: {
    isComplete() {
      return this.student;
    }
  }
};
</script>