<template>
  <div @click="selectCard" class="note" :class="{ active: selectedCard === cardIndex }">
    <h3 class="title">{{ title }}</h3>
    <div class="footer">
      <span class="date">{{ noteDate }}</span><span class="content">{{ content || 'No additional text' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  createdAt: Number,
  content: String,
  selectedCard: Number,
  cardIndex: Number
})

const emit = defineEmits(['select'])

function selectCard() {
  emit('select', props.cardIndex)
}

const { createdAt, content } = props

const noteDate = computed(() => {
  const nowDate = new Date()
  const createdAtDate = new Date(createdAt || '')

  if (nowDate.getDate() < createdAtDate.getDate()) {
    return `${createdAtDate.getDate().toString().padStart(2, '0')}.${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}.${createdAtDate.getFullYear()}`
  }

  return `${createdAtDate.getHours().toString().padStart(2, '0')}:${createdAtDate.getMinutes().toString().padStart(2, '0')}`
})

const title = computed(() => {
  if (!content) {
    return 'New note'
  }

  return content?.split('\n')[0]
})


</script>

<style scoped lang="scss">
.note {
  padding: 1rem;
  border-radius: 16px;
  border-bottom: 1px solid #F0F0F0;
  transition: all .3s;
  overflow: hidden;

  .title {
    margin: 0 0 0.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .footer {
    display: flex;
    align-items: center;

    .date {
      margin-right: 0.5rem;
    }

    .content {
      display: inline-block;
      color: gray;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }


  &:hover {
    background-color: rgba(242, 200, 48, 0.4);
    cursor: pointer;
  }

  &.active {
    background-color: rgba(242, 200, 48, 1);
  }
}
</style>
