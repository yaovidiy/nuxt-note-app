<template>
  <div class="note" :class="{ active: isActive }">
    <h3 class="title">{{ title || 'New note' }}</h3>
    <span class="date">{{ showCorrectDate() }}</span><span class="content">{{ content || 'No additional text' }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  createdAt: Number,
  content: String,
  isActive: Boolean,
  cardIndex: Number
})

const { createdAt } = props

function showCorrectDate() {
  const nowDate = new Date()
  const createdAtDate = new Date(createdAt)

  if (nowDate.getDate() < createdAtDate.getDate()) {
    return `${createdAtDate.getDate().toString().padStart(2, '0')}.${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}.${createdAtDate.getFullYear()}`
  }

  return `${createdAtDate.getHours().toString().padStart(2, '0')}:${createdAtDate.getMinutes().toString().padStart(2, '0')}`
}

</script>

<style scoped lang="scss">
.note {
  padding: 1rem;
  border-radius: 16px;
  border-bottom: 1px solid #F0F0F0;
  transition: all .3s;

  .title {
    margin-bottom: 0.5rem;
  }

  .date {
    margin-right: 0.5rem;
  }

  .content {
    color: gray;
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
