<template>
  <Form
    v-slot="{ errors, isSubmitting }"
    class="d-flex flex-column align-items-start gap-3 w-100"
    :validation-schema="schema"
  >
    <div class="row w-100">
      <div class="col-12 col-md-7 d-flex flex-column gap-3">
        <div class="form-group">
          <label for="title">Title</label>
          <Field
            id="title"
            type="text"
            name="title"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
            placeholder="Title"
            aria-describedby="helpId"
          />
          <div class="invalid-feedback">
            {{ errors.title }}
          </div>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <Field
            id="description"
            type="text"
            name="description"
            class="form-control"
            :class="{ 'is-invalid': errors.description }"
            placeholder="Description"
            aria-describedby="helpId"
          />
          <div class="invalid-feedback">
            {{ errors.description }}
          </div>
        </div>
        <div class="form-group">
          <label for="body">Body</label>
          <Field
            id="body"
            as="textarea"
            name="body"
            aria-describedby="helpId"
            class="form-control"
            placeholder="Body"
            rows="10"
            :class="{ 'is-invalid': errors.body }"
          />
          <div class="invalid-feedback">
            {{ errors.body }}
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 d-flex flex-column">
        <div class="form-group">
          <label>Tags</label>
          <div class="flex flex-column gap-2">
            <input
              id="new-tag-title"
              class="form-control"
              type="text"
              name=""
              placeholder="New tag"
            />
            .
            <div class="card">
              <div class="card-body">
                <div class="card-text d-flex flex-column">
                  <div class="form-check">
                    <input
                      id="flexCheckDefault"
                      class="form-check-input"
                      type="checkbox"
                      value=""
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Tag
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
      <span
        v-show="isSubmitting"
        class="spinner-border spinner-border-sm mr-1 w-auto"
      ></span>
      Submit
    </button>
  </Form>
</template>
<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
defineProps({
  initial: {
    type: Object,
    default: () => ({
      title: "",
      description: "",
      body: "",
      tags: [],
    }),
  },
});
const schema = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
  description: Yup.string().required("Description is required!"),
  body: Yup.string().required("Body is required!"),
});
</script>
