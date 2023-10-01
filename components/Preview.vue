<template>
  <div v-html="previewData"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  markdown: String
})

const { markdown } = props

const previewData = computed(() => {
  return useParse(markdown)
})

</script>