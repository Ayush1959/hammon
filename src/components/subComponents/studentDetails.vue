<template>
  <div>
    <el-dialog
      title="Student Details"
      :visible="detailsFormVisible"
      @close="closeDialog"
      v-loading="loading"
      custom-class="col-xs-10 col-md-8 col-lg-7"
      width="40%"
    >
      <div class="pull-left w-100" v-if="studentDetails">
        <div class="row">
          <div class="col-9 text-left">
            <h5>Name:{{ studentDetails.name }}</h5>
          </div>
          <div class="col-3 text-left">
            <h5>Age:{{ studentDetails.age }}</h5>
          </div>
          <div class="col-9 text-left">
            <h5>Email:{{ studentDetails.email }}</h5>
          </div>
          <div class="col-3 text-left">
            <h5>Id:{{ studentDetails.id }}</h5>
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
      studentDetails: "",
      loading: false
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
  watch: {
    detailsFormVisible: function() {
      var app = this;
      if (app.detailsFormVisible) {
        if (app.id) {
          app.getStudentDetails();
        }
      }
    }
  },
  methods: {
    //------Get Student Details-----------------//
    getStudentDetails() {
      var app = this;
      app.loading = true;
      app.$axios
        .get(app.$hostname + "/students/" + app.id + app.$api_keys)
        .then(
          response => (
            (app.studentDetails = response.data), (app.loading = false)
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
    //------End of Get Student Details-----------//
    //------Close detail popupp--------------//
    closeDialog() {
      this.$emit("update:id", "");
      this.$emit("update:detailsFormVisible", false);
    }
    //------end of Close detail popupp-------//
  }
};
</script>