<script setup lang="ts">
import { data as articles } from '../utils/blogData.data'
import { computed, ref, onMounted } from 'vue'

const activeTag = ref('')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const tag = params.get('tag')
  if (tag) activeTag.value = tag
})

const tags = computed(() => {
  const tagCount = new Map<string, number>()
  for (const a of articles) {
    if (a.tag) {
      tagCount.set(a.tag, (tagCount.get(a.tag) || 0) + 1)
    }
  }
  return Array.from(tagCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const filteredArticles = computed(() => {
  if (!activeTag.value) return articles
  return articles.filter((a) => a.tag === activeTag.value)
})

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? '' : tag
}
</script>

<template>
  <div class="blog-tags">
    <h1>标签</h1>
    <div class="tag-cloud">
      <span
        v-for="t in tags"
        :key="t.name"
        class="tag-item"
        :class="{ active: activeTag === t.name }"
        @click="toggleTag(t.name)"
      >
        {{ t.name }} ({{ t.count }})
      </span>
    </div>

    <p style="color: var(--vp-c-text-3); font-size: 14px;">
      {{ activeTag ? `"${activeTag}" 标签下 ${filteredArticles.length} 篇文章` : `共 ${articles.length} 篇文章` }}
    </p>

    <div class="article-list">
      <a v-for="a in filteredArticles" :key="a.url" :href="a.url" class="article-card">
        <h4>{{ a.title }}</h4>
        <div class="meta">
          <span class="category">{{ a.categoryLabel }}</span>
          <span v-if="a.tag"> · {{ a.tag }}</span>
        </div>
      </a>
    </div>
  </div>
</template>
