<template>
  <div>
    <input
      id="checkbox4"
      type="checkbox"
      class="checkbox4 visuallyHidden"
      :checked="checked"
      @change="$emit('click')"
    />
    <label for="checkbox4">
      <div class="hamburger hamburger4">
        <span class="bar bar1"></span>
        <span class="bar bar2"></span>
        <span class="bar bar3"></span>
        <span class="bar bar4"></span>
        <span class="bar bar5"></span>
      </div>
    </label>
  </div>
</template>
<script setup lang="ts">
defineProps({
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>
<style scoped>
.visuallyHidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
.hamburger {
  margin: 0 auto;
  width: 20px;
  height: 20px;
  position: relative;
}
.hamburger .bar {
  padding: 0;
  width: 25px;
  height: 4px;
  background-color: white;
  display: block;
  border-radius: 4px;
  transition: all 0.4s ease-in-out;
  position: absolute;
}

.bar1 {
  top: 0;
}

.bar2,
.bar3 {
  top: 8.5px;
}

.bar3 {
  right: 0;
}

.bar4 {
  bottom: 8px;
}
.hamburger4 .bar5 {
  bottom: 0px;
}

.hamburger4 .bar {
  transition:
    all 0.4s ease-in-out,
    transform 0.4s ease-in-out 0.4s;
}

.hamburger4 .bar2 {
  width: 0px;
  transform: rotate(90deg);
  left: 13.5px;
}

.hamburger4 .bar3 {
  width: 0px;
  left: 13.5px;
}
.checkbox4:checked + label > .hamburger4 > .bar1 {
  top: 13.5px;
  background-color: transparent;
}

.checkbox4:checked + label > .hamburger4 > .bar2 {
  left: 0px;
  width: 30px;
  transform: rotate(45deg);
}

.checkbox4:checked + label > .hamburger4 > .bar3 {
  left: 0;
  width: 30px;
  transform: rotate(-45deg);
}

.checkbox4:checked + label > .hamburger4 > .bar4 {
  background-color: transparent;
}

.checkbox4:checked + label > .hamburger4 > .bar5 {
  bottom: 13.5px;
  background-color: transparent;
}
</style>
