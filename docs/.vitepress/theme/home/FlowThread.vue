<script setup lang="ts">
import type { Post } from './flow'

defineProps<{ place: string, posts: Post[], idle: string }>()

const initials = (name: string) => name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()
</script>

<template>
  <div class="thread thread-live">
    <p class="thread-place">{{ place }}</p>
    <div class="thread-posts">
      <p v-if="!posts.length" class="thread-idle">{{ idle }}</p>
      <article v-for="post in posts" :key="post.text" class="thread-post" :class="post.from">
        <p v-if="post.from === 'service'" class="thread-service"><b>{{ post.name }}</b> {{ post.text }}</p>
        <template v-else>
          <span class="thread-face" aria-hidden="true">{{ post.from === 'agent' ? '' : initials(post.name) }}</span>
          <div>
            <p class="thread-name">{{ post.name }} <span v-if="post.mark">{{ post.mark }}</span></p>
            <p class="thread-text">{{ post.text }}</p>
            <p v-if="post.file" class="thread-file">{{ post.file }}</p>
          </div>
        </template>
      </article>
    </div>
  </div>
</template>
