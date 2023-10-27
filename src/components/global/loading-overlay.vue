<template>
  <div class="loading-overlay">
    <div class="spinner">
      <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
<style scoped scss>
.loading-overlay {
  position: fixed;
  inset: 0;
  background-color: white;
  z-index: 20;
  .spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>
