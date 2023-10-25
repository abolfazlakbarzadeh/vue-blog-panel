<template>
  <div class="container mainContainer">
    <div class="row align-items-center justify-content-center login-page">
      <div class="card login-card">
        <div class="card-body">
          <h5 class="card-title">LOGIN</h5>
          <p class="card-text"><LoginForm /></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LoginForm from "@/components/auth/login-form.vue";
</script>
<style scss>
@import url("../../assets/styles/pages/auth/login.scss");
</style>
