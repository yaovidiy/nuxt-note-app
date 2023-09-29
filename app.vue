<template>
  <NoteCard :title="''" :content="''" :createdAt="new Date().getTime()" />
  <Preview :markdown="testMarkdown" />
</template>

<script setup>
import { ref } from 'vue'

const editorValue = ref('')

const testMarkdown = '# h1 \n ## h2 \n ### h3 \n #### h4 \n ##### h5 \n ###### h6 \n> Blockquot\n>> Nested Blockqout\n >>> third blockqout \n > Second type \n > > Second level \n > > > Thrird level \n `code` \n # h1 \n **bold** \n Some text with **bold** *italic* text!\n - one\n - two \n - three\n'

</script>