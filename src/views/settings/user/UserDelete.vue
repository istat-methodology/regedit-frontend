<template>
  <div class="row">
    <div class="col-sm-6 col-md-6">
      <div class="card ">
        <header class="card-header">
          User
          <router-link
            tag="a"
            :to="{
              name: 'UserList'
            }"
          >
            <span class="pl-1"
              ><users-icon class="pr-3" />back to user list</span
            >
          </router-link>
        </header>
        <div class="card-body">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Name</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.name"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Surname</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.surname"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Email</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.email"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Role</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.role"
            />
          </div>
          <div class="card-footer">
            <Button
              class="btn btn-outline-dark btn-sm"
              @click="handleDelete()"
              :disabled="submitStatus === 'PENDING'"
              >Delete</Button
            >
          </div>
          <p class="typo__p" v-if="submitStatus === 'OK'">
            Thanks for your submission!
          </p>
          <p class="typo__p" v-if="submitStatus === 'ERROR'">
            Please fill the form correctly.
          </p>
          <p class="typo__p" v-if="submitStatus === 'PENDING'">
            Sending...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserDelete",
  data() {
    return {
      submitStatus: null
    };
  },
  computed: {
    ...mapGetters("user", ["user"])
  },
  created() {
    this.$store.dispatch("user/findById", this.$route.params.id);
  },
  methods: {
    handleDelete() {
      this.$store.dispatch("user/delete", this.$route.params.id);
    }
  }
};
</script>
