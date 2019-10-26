<template>
  <div>
    <el-dialog
      title="Leave Details"
      :visible="detailsFormVisible"
      @close="closeDialog"
      v-loading="loading"
      custom-class="col-xs-10 col-md-8 col-lg-7"
      width="40%"
    >
      <div class="pull-left w-100" v-if="studentDetails">
        <div class="row">
          <div class="col-xs-4 xs-lg-fullwidth colum-style">
            Sales Executive:
            <h5>{{studentDetails.user.name}}</h5>
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
        // .get(app.$hostname + "/students?id=" + app.id + "/" + app.$api_key)
        .get(app.$hostname + "/students" + app.$api_key + "&id=" + app.id)
        .then(
          response => (
            (app.studentDetails = response.data.students), (app.loading = false)
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