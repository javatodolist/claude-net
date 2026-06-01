<script setup lang="ts">
import { data as articles } from '../utils/blogData.data'
import { computed } from 'vue'

const grouped = computed(() => {
  const map = new Map<string, { label: string; items: typeof articles }>()
  for (const a of articles) {
    if (!map.has(a.category)) {
      map.set(a.category, { label: a.categoryLabel, items: [] })
    }
    map.get(a.category)!.items.push(a)
  }
  return Array.from(map.entries()).map(([key, val]) => ({ key, ...val }))
})
</script>

<template>
  <div class="blog-categories">
    <h1>分类</h1>
    <div v-for="group in grouped" :key="group.key" :id="group.key" style="margin-bottom: 40px; scroll-margin-top: 80px;">
      <h2>{{ group.label }} <span style="font-size: 14px; color: var(--vp-c-text-3); font-weight: 400;">（{{ group.items.length }} 篇）</span></h2>
      <div class="article-list">
        <a v-for="a in group.items" :key="a.url" :href="a.url" class="article-card">
          <h4>{{ a.title }}</h4>
          <div class="meta">
            <span v-if="a.tag">{{ a.tag }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
