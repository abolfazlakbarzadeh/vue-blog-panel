<template>
  <Form
    v-slot="{ errors, isSubmitting }"
    class="login-form d-flex flex-column gap-3"
    :validation-schema="schema"
    @submit="submitHandler"
  >
    <div class="form-group">
      <label for="username" :class="{ 'text-danger': errors.username }"
        >Username</label
      >
      <Field
        id="username"
        v-model="data.username"
        name="username"
        type="text"
        class="form-control"
        data-test-subj="username-field"
        :class="{ 'is-invalid': errors.username }"
      />
      <div class="invalid-feedback">{{ errors.username }}</div>
    </div>
    <div class="form-group">
      <label for="email" :class="{ 'text-danger': errors.email }">Email</label>
      <Field
        id="email"
        v-model="data.email"
        name="email"
        type="email"
        data-test-subj="email-field"
        class="form-control"
        :class="{ 'is-invalid': errors.email }"
      />
      <div class="invalid-feedback">{{ errors.email }}</div>
    </div>
    <div class="form-group">
      <label for="password" :class="{ 'text-danger': errors.password }"
        >Password</label
      >
      <Field
        id="password"
        v-model="data.password"
        name="password"
        type="password"
        data-test-subj="password-field"
        class="form-control"
        :class="{ 'is-invalid': errors.password }"
      />
      <div class="invalid-feedback">{{ errors.password }}</div>
    </div>
    <div class="d-grid mt-3">
      <button
        type="submit"
        class="btn btn-primary btn-block"
        :disabled="isSubmitting"
      >
        <span
          v-show="isSubmitting"
          class="spinner-border spinner-border-sm mr-1"
        ></span>
        Register
      </button>
    </div>
  </Form>
</template>
<script lang="ts" setup>
import { Form, Field } from "vee-validate";
import { reactive } from "vue";
import * as Yup from "yup";

const data = reactive({
  username: "",
  email: "",
  password: "",
});

const emit = defineEmits(["submit"]);

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  email: Yup.string().email().required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

function submitHandler(values) {
  emit("submit", values);
}
</script>
<style scss>
@import url("@/assets/styles/components/auth/login-form.scss");
</style>
