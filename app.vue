<template>
  <NoteCard :title="''" :content="''" :createdAt="new Date().getTime()" />
  <Editor v-model:value="editorValue" />

  <span v-html="editorValue"></span>
</template>

<script setup>
import { ref } from 'vue'
const editorValue = ref('')

</script>