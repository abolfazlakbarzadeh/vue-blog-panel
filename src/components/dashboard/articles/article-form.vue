<template>
  <Form
    v-slot="{ errors, isSubmitting }"
    class="d-flex flex-column align-items-start gap-3 w-100"
    :validation-schema="schema"
    @submit="handleSubmit"
  >
    <div class="row w-100">
      <div class="col-12 col-md-7 d-flex flex-column gap-3">
        <div class="form-group">
          <label for="title">Title</label>
          <Field
            id="title"
            v-model="initial.article.title"
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
            v-model="initial.article.description"
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
            v-model="initial.article.body"
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
              v-model="newTagInputValue"
              class="form-control"
              type="text"
              name=""
              placeholder="New tag"
              @keypress="handleNewTagInputKeyPress"
            />
            .
            <div class="card">
              <div class="card-body">
                <div class="card-text d-flex flex-column">
                  <div
                    v-for="(tag, index) in allTags"
                    :key="index"
                    class="form-check"
                  >
                    <input
                      :id="`tag-${tag.value}`"
                      class="form-check-input"
                      type="checkbox"
                      :value="tag.value"
                      :checked="tag.checked"
                      @change="handleTagChange"
                    />
                    <label class="form-check-label" :for="`tag-${tag.value}`">
                      {{ tag.value }}
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
<script lang="ts" setup>
import { Form, Field } from "vee-validate";
import { ARTICLE_SAMPLE } from "@/services/articles/constants";
import { onMounted, ref, toRefs } from "vue";
import * as Yup from "yup";
import { useTagService } from "@/services/tags/tags-service";
import { FetchTagsResponse, Tag } from "@/services/tags/types";

const emit = defineEmits(["submit"]);
const props = defineProps({
  initial: {
    type: Object,
    default: () => ({
      article: { ...ARTICLE_SAMPLE },
    }),
  },
});
const { initial } = toRefs(props);
const newTagInputValue = ref("");
const allTags = ref<Tag[]>(initial.value.article.tagList);
const tagsService = useTagService();

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
  description: Yup.string().required("Description is required!"),
  body: Yup.string().required("Body is required!"),
});

async function fetchTags() {
  const tags = (await tagsService.fetchTags()) as Awaited<FetchTagsResponse>;
  allTags.value = Array.from(
    new Set([...tags.tags, ...initial.value.article.tagList]),
  )
    .sort()
    .map((tag: string) => ({
      value: tag,
      checked: (initial.value.article.tagList as string[]).some(
        (_tag) => tag === _tag,
      ),
    }));
}

function changeTagState(tag: string, checked: boolean) {
  const tagIndex = allTags.value.findIndex((_tag) => _tag.value == tag);
  allTags.value
    .splice(tagIndex, 1, {
      value: tag,
      checked: checked,
    })
    .sort((tag, ntag) => (tag.value > ntag.value ? 1 : -1));
}

function handleNewTagInputKeyPress(e) {
  if (e.key == "Enter") {
    e.preventDefault();
    // Check the tag to see if it's a duplicate tag; if it's a duplicate, just enable it.
    if (!allTags.value.some((tag) => tag.value == newTagInputValue.value)) {
      allTags.value = allTags.value
        .concat({
          value: newTagInputValue.value,
          checked: true,
        })
        .sort((tag, ntag) => (tag.value > ntag.value ? 1 : -1));
    } else {
      changeTagState(newTagInputValue.value, true);
    }

    newTagInputValue.value = "";
  }
}
function handleSubmit(values) {
  return emit("submit", {
    ...values,
    tagList: allTags.value.filter((tag) => tag.checked).map((tag) => tag.value),
  });
}
function handleTagChange(payload) {
  changeTagState(payload.target.value, payload.target.checked);
}

onMounted(() => {
  fetchTags();
});
</script>
