<template>
  <div>
    <el-dialog
      title="Assign Subject"
      :visible="assignFormVisible"
      @close="closeDialog"
      v-loading="loading"
      custom-class="col-xs-10 col-md-8 col-lg-7"
      width="30%"
    >
      <div class="pull-left w-100" v-show="id">
        <div class="row">
          <el-select
            filterable
            v-model="subject"
            class="w-100"
            name="subject"
            id="subject"
            placeholder="Select Subject *"
            v-validate="'required'"
          >
            <el-option
              v-for="subject in subjectList"
              :key="subject.id"
              :label="subject.name"
              :value="subject.id"
            ></el-option>
          </el-select>
          <span class="error" v-if="errors.has('subject')">{{errors.first('subject')}}</span>
        </div>
      </div>
      <span slot="footer" class="col-xs-12">
        <el-button
          type="primary"
          @click="assignSubject()"
          :disabled="errors.any() || !isComplete"
        >Assign</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      classroomDetails: "",
      loading: false,
      subjectList: [],
      subject: "",
      error: ""
    };
  },
  mounted() {
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
  props: {
    assignFormVisible: {
      required: true
    },
    id: {
      required: true
    }
  },
  watch: {
    assignFormVisible: function() {
      var app = this;
      if (app.assignFormVisible) {
        if (app.id) {
          app.getClassroomDetails();
        }
      }
    }
  },
  methods: {
    //------assign classroom-----------------//
    assignSubject() {
      var app = this;
      app.loading = true;
      let formData = new FormData();
      formData.append("subject", app.subject);
      app.$axios
        .patch(
          app.$hostname + "/classrooms/" + app.id + app.$api_keys,
          formData
        )
        .then(function(response) {
          app.loading = false;
          if (response.data.subject == app.subject) {
            app.$message({
              message: "Subject Assigned Sucessfully.",
              type: "success"
            });
          } else {
            app.$message({
              message: "Subject cannot be Assigned.",
              type: "error"
            });
          }
        })
        .catch(error => {
          app.error = error;
          app.$message({
            message: "Subject cannot be Assigned.",
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
            (app.subject = response.data.subject), (app.loading = false)
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
      this.$validator.reset();
      this.subject = "";
      this.$emit("update:id", "");
      this.$emit("update:assignFormVisible", false);
    }
    //------end of Close detail popupp-------//
  },
  computed: {
    isComplete() {
      return this.subject;
    }
  }
};
</script>