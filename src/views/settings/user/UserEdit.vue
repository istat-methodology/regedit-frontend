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
          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.user.name.$error }"
          >
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
            <div class="row col-12">
              <div class="error" v-if="!$v.user.name.required">
                Name is required
              </div>
              <div class="error" v-if="!$v.user.name.minLength">
                Name must have at least
                {{ $v.user.name.$params.minLength.min }} letters.
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.user.surname.$error }"
          >
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
            <div class="row col-12">
              <div class="error" v-if="!$v.user.surname.required">
                Surname is required
              </div>
              <div class="error" v-if="!$v.user.surname.minLength">
                Name must have at least
                {{ $v.user.surname.$params.minLength.min }} letters.
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.user.email.$error }"
          >
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
            <div class="row col-12">
              <div class="error" v-if="!$v.user.email.required">
                Email is required
              </div>
              <div class="error" v-if="!$v.user.email.email">
                must have a valid
                {{ $v.user.email.$params.email }}.
              </div>
            </div>
          </div>
          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.user.role.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Role</span
              >
            </div>

            <v-select
              label="role"
              :options="roles"
              placeholder="role"
              v-model="user.role"
            ></v-select>

            <div class="row col-12">
              <div class="error" v-if="!$v.user.role.required">
                role is required
              </div>
            </div>
          </div>

          <div class="card-footer">
            <button
              class="btn btn-outline-dark btn-sm"
              @click.prevent="handleUpdate()"
              :disabled="submitStatus === 'PENDING'"
            >
              Update!
            </button>

            <!--  <Button
              class="btn btn-outline-dark btn-sm"
              @click.prevent="handleReset()"
              >Reset</Button
            > -->
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
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "UserEdit",
  data() {
    return {
      submitStatus: null
      //disabled: true
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(4)
      },
      surname: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      role: {
        required
      }
    }
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("role", ["roles"])
  },
  created() {
    this.$store.dispatch("user/findById", this.$route.params.id);
    this.$store.dispatch("role/findAll");
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
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
          roleid: this.user.role.id
        };

        this.$store.dispatch("user/update", data);
      }
    },
    handleReset() {
      this.user.name = "";
      this.user.surname = "";
      this.user.email = "";
      /*  this.user.password = ""; */
      this.user.role = null;
      this.$v.$reset();
    }
  }
};
</script>
