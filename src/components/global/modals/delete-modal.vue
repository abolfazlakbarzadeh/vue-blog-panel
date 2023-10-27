<template>
  <Teleport to="body">
    <div
      class="modal fade show"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      role="dialog"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body"><slot></slot></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="$emit('dismiss')"
            >
              {{ dismissText }}
            </button>
            <button
              type="button"
              class="btn"
              :class="`btn-${submitType}`"
              @click="$emit('submit')"
            >
              {{ submitText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  dismissText: {
    type: String,
    required: true,
    default: "Close",
  },
  submitText: {
    type: String,
    required: true,
    default: "Ok",
  },
  submitType: {
    type: String,
    default: "primary",
  },
});

defineEmits(["submit", "dismiss"]);
</script>
