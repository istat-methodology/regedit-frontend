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
        <div class="card-body" v-if="user">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Name</span
              >
            </div>
            <input
              class="input"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.name"
              readonly
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Surname</span
              >
            </div>
            <input
              class="input"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.surname"
              readonly
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Email</span
              >
            </div>
            <input
              class="input"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.email"
              readonly
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Role</span
              >
            </div>

            <v-select
              class="input"
              label="role"
              :options="roles"
              placeholder="role"
              v-model="user.role"
              v-bind:class="{ disabled: true }"
            ></v-select>
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
    ...mapGetters("user", ["user"]),
    ...mapGetters("role", ["roles"])
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
<style scoped>
.input {
  background-color: #f5f5f5;
  border: 1px solid;
  color: #768192;
  border-color: #d8dbe0;
}
.disabled {
  pointer-events: none;
  color: #bfcbd9;
  cursor: not-allowed;
  background-image: none;
  background-color: #f5f5f5;
  border-color: #d1dbe5;
}
</style>
