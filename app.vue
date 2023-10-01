<template>
  <div class="container">
    <div class="row">
      <div :class="{ active: isMobileMenuOpened }" class="sidebar">
        <div class="controls">
          <div class="btns">
            <button @click="addNote" class="btn">
              <svg fill="gray" width="24" height="24" viewBox="0 0 32 32"
                style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1"
                xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <path
                  d="M14.5,14.501l-10.502,0c-0.828,0 -1.5,0.673 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5l10.502,0l-0.001,10.502c0,0.828 0.672,1.5 1.5,1.501c0.828,-0 1.5,-0.673 1.5,-1.5l0.001,-10.503l10.502,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.827 -0.672,-1.5 -1.5,-1.5l-10.502,0l0.001,-10.501c-0,-0.828 -0.672,-1.501 -1.5,-1.501c-0.828,0 -1.5,0.672 -1.5,1.5l-0.001,10.502Z" />
                <g id="Icon" />
              </svg>
            </button>

            <button @click="removeNote" class="btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                  stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <button @click="() => isMobileMenuOpened = false" class="btn mobile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                fill="gray" />
            </svg>
          </button>
        </div>
        <div class="cards" v-for="(card, index) in placeholderCards">
          <NoteCard
            @select="(i) => { editMode = false; activeCard = i; isMobileMenuOpened = false; activeEditorValue = card.content }"
            :cardIndex="index" :selectedCard="activeCard" :content="card.content" :createdAt="card.createdAt"
            :key="card.content" />
        </div>
      </div>
      <div class="content">
        <div class="controls">
          <div class="btns">
            <button @click="() => isMobileMenuOpened = true" class="btn mobile menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18L20 18" stroke="gray" stroke-width="2" stroke-linecap="round" />
                <path d="M4 12L20 12" stroke="gray" stroke-width="2" stroke-linecap="round" />
                <path d="M4 6L20 6" stroke="gray" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
            <button @click="editMode = true" v-if="activeCard !== -1 && !editMode" class="btn">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

            <button v-if="activeCard !== -1 && editMode" class="btn">
              <svg width="24" height="24" viewBox="-10 -5 1034 1034" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
                <path fill="#000000" d="M922 319q-1 0 -2 1h-11v0h-836q-18 0 -33.5 8.5t-25.5 22.5q-17 26 -13 57v461q1 18 11 32.5t24 22.5q25 14 55 10v1l843 -1q18 -1 32.5 -11t22.5 -24q14 -24 10 -55h1l-1 -459q-1 -17 -11 -31.5t-24 -23.5q-19 -10 -42 -11zM918 367h2q12 0 20 5q6 3 8.5 6.5t2.5 9.5
l1 456v3q2 16 -5 29q-3 5 -6.5 7.5t-9.5 2.5l-840 1h-3q-16 2 -28 -5q-6 -3 -8.5 -6.5t-2.5 -9.5v-458l-1 -4q-2 -14 5.5 -25t18.5 -11h837zM145 464v327h96v-188l96 120l96 -120v188h96v-327h-96l-96 120l-96 -120h-96zM697 464v168h-96l144 159l144 -159h-96v-168h-96z
" />
              </svg>
            </button>
          </div>

          <label for="search">
            <button class="btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <input class="search" type="text" id="search" placeholder="Search">
          </label>
        </div>
        <div v-if="activeCard !== -1">
          <h5 class="date">{{ useDateConverter(placeholderCards[activeCard]?.createdAt) }}</h5>
          <Preview :key="activeCard" v-if="!editMode" :markdown="activeEditorValue" />
          <Editor @update-note-content="updateNoteContent" v-if="editMode" v-model:value="activeEditorValue" />
        </div>
        <div v-if="activeCard === -1" class="placeholder">
          <h2>Select a note to edit and preview it</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const isMobileMenuOpened = ref(false)
const activeCard = ref(-1)
const editMode = ref(false)
const activeEditorValue = ref('')
let updateTimeout: ReturnType<typeof setTimeout> | null = null

const placeholderCards = reactive([
  {
    content: '',
    createdAt: new Date().getTime() - 200000
  },
  {
    content: '# Headline content \n asdfafasfasfasfasdfasf',
    createdAt: new Date().getTime() - 250000
  },
  {
    content: '## Headline 2 content \n asdfasdfasdfasfasdfasdf',
    createdAt: new Date().getTime() - 400000
  }
])

function updateNoteContent(newContent: string): void {
  if (updateTimeout) {
    clearTimeout(updateTimeout)
  }
  updateTimeout = setTimeout(() => {
    if (placeholderCards[activeCard.value]) {
      placeholderCards[activeCard.value].content = newContent
    }
  }, 500)
}

function addNote(): void {
  const emptyNote = {
    content: '',
    createdAt: new Date().getTime()
  }

  const length = placeholderCards.push(emptyNote)

  activeCard.value = length - 1
}

function removeNote(): void {
  placeholderCards.splice(activeCard.value, 1)

  activeCard.value = -1
}

</script>

<style scoped lang="scss">
:global(body) {
  overflow: hidden;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.btns {
  display: flex;
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
    height: 24px;
    padding-left: 32px;
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
  padding: 0 4px;

  .controls {
    display: flex;
    justify-content: space-between;
  }

  .date {
    text-align: center;
  }
}

.sidebar {
  position: absolute;
  left: -1000px;
  width: 100%;
  border-right: 1px solid #f0f0f0;
  padding: 0 4px;
  height: 100vh;
  max-height: calc(100vh - 2rem);
  overflow: auto;
  background-color: #FFFFFF;
  z-index: 3;
  transition: all .3s;

  &.active {
    left: 0px;
  }

  .controls {
    display: flex;
    margin-bottom: 16px;
    justify-content: space-between;

    .btns {
      display: flex;

      .btn:first-child {
        margin-right: 16px;
      }
    }
  }
}

.mobile {
  &.menu {
    margin-right: 16px;
  }
}

.row {
  display: flex;
  width: 100%;
}

@media (min-width: 768px) {
  .sidebar {
    position: relative;
    left: 0;
    flex-basis: 25%;
    padding: 0 16px;
  }

  .content {
    flex-basis: 75%;
    padding: 0 16px;
  }

  .mobile {
    display: none;
  }
}
</style>