<template>
  <Form
    v-slot="{ errors, isSubmitting }"
    class="login-form d-flex flex-column gap-3"
    :validation-schema="schema"
    @submit="submitHandler"
  >
    <div class="form-group">
      <label for="email" :class="{ 'text-danger': errors.email }">Email</label>
      <Field
        id="email"
        v-model="data.email"
        name="email"
        type="email"
        class="form-control"
        data-test-subj="email-field"
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
        data-test-subj="submit-button"
        class="btn btn-primary btn-block"
        :disabled="isSubmitting"
      >
        <span
          v-show="isSubmitting"
          class="spinner-border spinner-border-sm mr-1"
        ></span>
        Login
      </button>
    </div>
  </Form>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
const emit = defineEmits(["submit"]);
const data = reactive({
  email: "",
  password: "",
});

const schema = Yup.object().shape({
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
