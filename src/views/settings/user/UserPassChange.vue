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
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              readonly
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
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              readonly
              v-model="user.surname"
            />
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.oldPassword.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Vecchia password</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="oldPassword"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.oldPassword.required">
                password is required
              </div>
              <div class="error" v-if="!$v.oldPassword.minLength">
                password must have at least
                {{ $v.oldPassword.$params.minLength.min }} letters.
              </div>
            </div>
          </div>
          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.newPassword.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Nuova password</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="newPassword"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.newPassword.required">
                password is required
              </div>
              <div class="error" v-if="!$v.newPassword.minLength">
                password must have at least
                {{ $v.newPassword.$params.minLength.min }} letters.
              </div>
            </div>
          </div>
          <!--  <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.newRepeatedPassword.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Ripeti password</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="newRepeatedPassword"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.newRepeatedPassword.sameAsPassword">
                La password deve essere identica.
              </div>
            </div>
          </div> -->

          <div class="card-footer">
            <button
              class="btn btn-outline-dark btn-sm"
              @click.prevent="handleUpdate()"
              :disabled="submitStatus === 'PENDING'"
            >
              Update!
            </button>
          </div>
          <div class="row col-12">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, minLength /* sameAs */ } from "vuelidate/lib/validators";
export default {
  name: "UserPassChange",
  data() {
    return {
      submitStatus: null,
      oldPassword: "",
      newPassword: ""
      //newRepeatedPassword: ""
    };
  },
  validations: {
    oldPassword: {
      required,
      minLength: minLength(8)
    },
    newPassword: {
      required,
      minLength: minLength(8)
    }
    /* newRepeatedPassword: {
      sameAsPassword: sameAs("newPassword")
    } */
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("role", ["roles"])
  },
  created() {
    this.$store.dispatch("user/findById", this.$route.params.id);
    //this.$store.dispatch("role/findAll");
  },
  methods: {
    /*  changeRole(value) {
      this.user.role = value;
    }, */
    handleUpdate() {
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const data = {
          id: this.user.id,
          /* name: this.user.name,
          surname: this.user.surname, */
          oldpass: this.oldPassword,
          newpass: this.newPassword
        };
        this.$store.dispatch("user/changePassword", data);
      }
    }
  }
};
</script>
