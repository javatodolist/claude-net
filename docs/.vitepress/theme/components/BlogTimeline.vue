<script setup lang="ts">
import { data as articles } from '../utils/blogData.data'
import { computed } from 'vue'

const grouped = computed(() => {
  const map = new Map<string, typeof articles>()
  for (const a of articles) {
    const key = a.categoryLabel
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(a)
  }
  return Array.from(map.entries()).map(([label, items]) => ({ label, items }))
})
</script>

<template>
  <div class="blog-timeline">
    <h1>时间线</h1>
    <div v-for="group in grouped" :key="group.label" style="margin-bottom: 36px;">
      <h2 style="display: flex; align-items: center; gap: 8px;">
        <span style="width: 12px; height: 12px; border-radius: 50%; background: var(--vp-c-brand-1); display: inline-block;"></span>
        {{ group.label }}
      </h2>
      <div style="border-left: 2px solid var(--vp-c-divider); margin-left: 5px; padding-left: 20px;">
        <a
          v-for="a in group.items"
          :key="a.url"
          :href="a.url"
          class="article-card"
          style="margin-bottom: 8px;"
        >
          <h4>{{ a.title }}</h4>
          <div class="meta">
            <span v-if="a.tag">{{ a.tag }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
