<template>
  <div class="container">
    <div class="row">
      <div class="sidebar">
        <div class="controls">
          <button>add</button> <button>delete</button>
        </div>
        <div class="cards" v-for="(card, index) in placeholderCards">
          <NoteCard :cardIndex="index" :isActive="index === activeCard" :title="card.title" :content="card.content"
            :createdAt="card.createdAt" />
        </div>
      </div>
      <div class="content">
        <div class="controls">
          <button>edit</button> <input type="text" placeholder="search">
          <div v-if="activeCard !== null">
            <h5 class="date">{{ useDateConverter(placeholderCards[activeCard]?.createdAt) }}</h5>
            <Preview v-if="!editMode" :markdown="placeholderCards[activeCard]?.content" />
            <Editor v-if="editMode" v-model:value="activeEditorValue" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let activeCard = ref(null)
let editMode = false
let activeEditorValue = ref('')

const placeholderCards = [
  {
    title: '',
    content: '',
    createdAt: new Date().getTime() - 200000
  },
  {
    title: '# Headline 1',
    content: '# Headline content \n asdfafasfasfasfasdfasf',
    createdAt: new Date().getTime() - 250000
  },
  {
    title: '## Headline 2',
    content: '## Headline 2 content \n asdfasdfasdfasfasdfasdf',
    createdAt: new Date().getTime() - 400000
  }
]

</script>

<style>
body {
  overflow: hidden;
}

.container {
  width: 100vw;
}

.content {
  width: 100%;
  padding: 0 8px;
}

.sidebar {
  width: 100%;
  border-right: 1px solid #f0f0f0;
  padding: 0 8px;
  height: 100vh;
  max-height: calc(100vh - 2rem);
  overflow: auto;
}

.row {
  display: flex;
  width: 100%;
}

@media (min-width: 768px) {
  .sidebar {
    flex-basis: 33%;
  }

  .content {
    flex-basis: 66%;
  }
}
</style>