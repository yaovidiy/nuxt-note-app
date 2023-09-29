<template>
  <textarea v-bind:value="value" v-on:input="$emit('update:value', $event.target.value)" class="editor"></textarea>
</template>

<script setup>
defineProps({
  value: String
})
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100vh;
  padding: 12px 20px;
  box-sizing: border-box;
  border: none;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  outline: none;
}
</style>