<template>
  <div v-html="previewData"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  markdown: String
})


const previewData = useParse(props.markdown)
</script>