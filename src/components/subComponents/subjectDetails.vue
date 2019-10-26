<template>
  <div>
    <el-dialog
      title="Subject Details"
      :visible="detailsFormVisible"
      @close="closeDialog"
      v-loading="loading"
      custom-class="col-xs-10 col-md-8 col-lg-7"
      width="40%"
    >
      <div class="pull-left w-100" v-if="subjectDetails">
        <div class="row">
          <div class="col-8 text-left">
            <h5>Name:{{ subjectDetails.name }}</h5>
          </div>
          <div class="col-4 text-left">
            <h5>Credits:{{ subjectDetails.credits }}</h5>
          </div>
          <div class="col-8 text-left">
            <h5>Teacher:{{ subjectDetails.teacher }}</h5>
          </div>
          <div class="col-4 text-left">
            <h5>Id:{{ subjectDetails.id }}</h5>
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
      subjectDetails: "",
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
          app.getSubjectDetails();
        }
      }
    }
  },
  methods: {
    //------Get subject Details-----------------//
    getSubjectDetails() {
      var app = this;
      app.loading = true;
      app.$axios
        .get(app.$hostname + "/subjects/" + app.id + app.$api_keys)
        .then(
          response => (
            (app.subjectDetails = response.data), (app.loading = false)
          )
        )
        .catch(error => {
          app.error = error;
          app.$message({
            message: "subject Details cannot be Loaded.",
            type: "error"
          });
          app.loading = false;
        })
        .finally(() => (app.loading = false));
    },
    //------End of Get subject Details-----------//
    //------Close detail popupp--------------//
    closeDialog() {
      this.$emit("update:id", "");
      this.$emit("update:detailsFormVisible", false);
    }
    //------end of Close detail popupp-------//
  }
};
</script>