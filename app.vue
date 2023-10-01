<template>
  <div class="container">
    <div class="row">
      <div class="sidebar">
        <div class="controls">
          <button class="btn">
            <svg fill="gray" width="16" height="16" viewBox="0 0 32 32"
              style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1"
              xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <path
                d="M14.5,14.501l-10.502,0c-0.828,0 -1.5,0.673 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5l10.502,0l-0.001,10.502c0,0.828 0.672,1.5 1.5,1.501c0.828,-0 1.5,-0.673 1.5,-1.5l0.001,-10.503l10.502,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.827 -0.672,-1.5 -1.5,-1.5l-10.502,0l0.001,-10.501c-0,-0.828 -0.672,-1.501 -1.5,-1.501c-0.828,0 -1.5,0.672 -1.5,1.5l-0.001,10.502Z" />
              <g id="Icon" />
            </svg>
          </button>

          <button class="btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div class="cards" v-for="(card, index) in placeholderCards">
          <NoteCard :cardIndex="index" :isActive="index === activeCard" :title="card.title" :content="card.content"
            :createdAt="card.createdAt" />
        </div>
      </div>
      <div class="content">
        <div class="controls">
          <button class="btn">
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="Complete">
                <g id="edit">
                  <g>
                    <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="gray"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="gray"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                  </g>
                </g>
              </g>
            </svg>
          </button>

          <label for="search">
            <button class="btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <input class="search" type="text" id="search" placeholder="Search">
          </label>
        </div>
        <div v-if="activeCard !== null">
          <h5 class="date">{{ useDateConverter(placeholderCards[activeCard]?.createdAt) }}</h5>
          <Preview v-if="!editMode" :markdown="placeholderCards[activeCard]?.content" />
          <Editor v-if="editMode" v-model:value="activeEditorValue" />
        </div>
        <div v-if="activeCard === null" class="placeholder">
          <h2>Select a note to edit and preview it</h2>
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

<style scoped lang="scss">
:global(body) {
  overflow: hidden;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  h2 {
    color: gray;
    transition: color .3s;

    &:hover {
      color: #000000;
    }
  }
}

label {
  position: relative;

  input.search {
    padding-left: 24px;
    border-radius: 4px;
    border-color: gray;
  }
  
  .btn {
    position: absolute;
    top: 2px;
    left: 4px;
  }
}

.container {
  width: 100vw;
}

.content {
  width: 100%;
  padding: 0 16px;

  .controls {
    display: flex;
    justify-content: space-between;
  }
}

.sidebar {
  width: 100%;
  border-right: 1px solid #f0f0f0;
  padding: 0 8px;
  height: 100vh;
  max-height: calc(100vh - 2rem);
  overflow: auto;

  .controls {
    display: flex;
    margin-bottom: 16px;

    .btn:first-child {
      margin-right: 16px;
    }
  }
}

.row {
  display: flex;
  width: 100%;
}

@media (min-width: 768px) {
  .sidebar {
    flex-basis: 25%;
  }

  .content {
    flex-basis: 75%;
  }
}
</style>