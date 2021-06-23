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
          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.name.$error }"
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
              v-model="name"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.name.required">
                Name is required
              </div>
              <div class="error" v-if="!$v.name.minLength">
                Name must have at least
                {{ $v.name.$params.minLength.min }} letters.
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.surname.$error }"
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
              v-model="surname"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.surname.required">
                Surname is required
              </div>
              <div class="error" v-if="!$v.surname.minLength">
                Name must have at least
                {{ $v.surname.$params.minLength.min }} letters.
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.email.$error }"
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
              v-model="email"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.email.required">
                Email is required
              </div>
              <div class="error" v-if="!$v.email.email">
                must have a valid
                {{ $v.email.$params.email }}.
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.role.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Role</span
              >
            </div>
            <!--  <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="role"
            /> -->

            <v-select
              label="role"
              :options="roles"
              placeholder="Ruoli"
              @input="changeRole"
            ></v-select>

            <div class="row col-12">
              <div class="error" v-if="!$v.role.required">
                role is required
              </div>
              <div class="error" v-if="!$v.role.minLength">
                role must have at least
                {{ $v.role.$params.minLength.min }} letters.
              </div>
            </div>
          </div>
          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.password.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Password</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="password"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.password.required">
                password is required
              </div>
              <div class="error" v-if="!$v.password.minLength">
                password must have at least
                {{ $v.password.$params.minLength.min }} letters.
              </div>
            </div>
          </div>
          <div class="card-footer">
            <Button
              class="btn btn-outline-dark btn-sm"
              @click="handleAdd()"
              :disabled="submitStatus === 'PENDING'"
              >Add</Button
            >
            <Button
              class="btn btn-outline-dark btn-sm"
              @click="handleReset()"
              :disabled="submitStatus === 'PENDING'"
              >Reset</Button
            >
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
  name: "UserAdd",
  data() {
    return {
      //formTouched: false,
      submitStatus: null,
      name: "",
      surname: "",
      email: "",
      role: "",
      password: ""
    };
  },
  validations: {
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
      required,
      minLength: minLength(1)
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("role", ["roles"])
  },
  methods: {
    changeRole(value) {
      this.role = value.id;
    },
    handleAdd() {
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const data = {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
          role: this.role
        };
        this.$store.dispatch("user/save", data);
      }
    },
    handleReset() {
      this.name = "";
      this.surname = "";
      this.email = "";
      this.role = "";
      this.password = "";
      this.$v.$reset();
    }
  },
  created() {
    this.$store.dispatch("role/findAll");
  }
};
</script>
