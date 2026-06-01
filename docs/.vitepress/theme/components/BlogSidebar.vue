<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { withBase, useRoute } from 'vitepress'
import { data as articles } from '../utils/blogData.data'

const route = useRoute()

interface OutlineHeader { level: number; title: string; link: string }
const headers = ref<OutlineHeader[]>([])
const activeLink = ref('')
let headingEls: HTMLElement[] = []

function extractHeaders() {
  const article = document.querySelector('.vp-doc')
  if (!article) { headers.value = []; activeLink.value = ''; headingEls = []; return }
  headingEls = (Array.from(article.querySelectorAll('h2, h3')) as HTMLElement[]).filter(h => h.id)
  headers.value = headingEls.map(h => ({
    level: parseInt(h.tagName[1]),
    title: h.textContent?.replace(/\s*#\s*$/, '').replace(/​/g, '').trim() || '',
    link: '#' + h.id,
  }))
  updateActive()
}

function updateActive() {
  if (!headingEls.length) return
  const offset = 96 // 导航栏高度 + 少量缓冲
  let active: HTMLElement | null = null
  for (const h of headingEls) {
    if (h.getBoundingClientRect().top <= offset) active = h
    else break
  }
  activeLink.value = active ? '#' + active.id : ''
}

onMounted(() => {
  extractHeaders()
  window.addEventListener('scroll', updateActive, { passive: true })
})
watch(() => route.path, () => {
  nextTick(() => {
    extractHeaders()
  })
})
onUnmounted(() => window.removeEventListener('scroll', updateActive))

const hasHeaders = computed(() => headers.value.length > 0)

type Tab = 'outline' | 'articles' | 'categories' | 'tags' | 'timeline'
const activeTab = ref<Tab>('articles')

// 页面切换时自动激活合适的 tab
watch(hasHeaders, (has) => {
  if (has) activeTab.value = 'outline'
  else if (activeTab.value === 'outline') activeTab.value = 'articles'
}, { immediate: true })

const expandedGroups = ref<Set<string>>(new Set())
function toggleGroup(id: string) {
  const next = new Set(expandedGroups.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedGroups.value = next
}

const ARTICLE_PAGE_SIZE = 20
const articlePage = ref(1)
const totalArticlePages = computed(() => Math.ceil(articles.length / ARTICLE_PAGE_SIZE))
const paginatedArticles = computed(() => {
  const start = (articlePage.value - 1) * ARTICLE_PAGE_SIZE
  return articles.slice(start, start + ARTICLE_PAGE_SIZE)
})

// 切换 tab 或路由时重置分页
watch(activeTab, (tab) => { if (tab === 'articles') articlePage.value = 1 })
watch(() => route.path, () => { articlePage.value = 1 })

const categoryGroups = computed(() => {
  const map = new Map<string, { label: string; count: number }>()
  for (const a of articles) {
    const existing = map.get(a.category)
    if (existing) existing.count++
    else map.set(a.category, { label: a.categoryLabel, count: 1 })
  }
  return Array.from(map.entries())
    .map(([category, val]) => ({ category, ...val }))
    .sort((a, b) => b.count - a.count)
})

const tagList = computed(() => {
  const map = new Map<string, number>()
  for (const a of articles) {
    if (a.tag) map.set(a.tag, (map.get(a.tag) || 0) + 1)
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const timelineGroups = computed(() => {
  const map = new Map<string, typeof articles>()
  for (const a of articles) {
    const key = a.categoryLabel
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(a)
  }
  return Array.from(map.entries()).map(([label, items], i) => ({ id: `group-${i}`, label, items }))
})

const categoryCount = computed(() => categoryGroups.value.length)
const tagCount = computed(() => tagList.value.length)
</script>

<template>
  <div class="profile-card">
    <img class="profile-avatar" :src="withBase('/avatar.png')" alt="头像" />
    <div class="profile-name">易安</div>
    <p class="profile-bio">深耕AI编程3年，30w粉丝，万人付费社群AI编程教练</p>
    <div class="profile-stats-inline">
      <div class="stat-item-inline">
        <span class="stat-value-inline">{{ articles.length }}</span>
        <span class="stat-label-inline">文章</span>
      </div>
      <div class="stat-item-inline">
        <span class="stat-value-inline">{{ categoryCount }}</span>
        <span class="stat-label-inline">分类</span>
      </div>
      <div class="stat-item-inline">
        <span class="stat-value-inline">{{ tagCount }}</span>
        <span class="stat-label-inline">标签</span>
      </div>
    </div>
  </div>

  <div class="sidebar-tabs-container">
    <div class="sidebar-tab-buttons">
      <button v-if="hasHeaders" :class="{ active: activeTab === 'outline' }" @click="activeTab = 'outline'">目录</button>
      <button :class="{ active: activeTab === 'articles' }" @click="activeTab = 'articles'">文章</button>
      <button :class="{ active: activeTab === 'categories' }" @click="activeTab = 'categories'">分类</button>
      <button :class="{ active: activeTab === 'tags' }" @click="activeTab = 'tags'">标签</button>
      <button :class="{ active: activeTab === 'timeline' }" @click="activeTab = 'timeline'">时间轴</button>
    </div>

    <div class="sidebar-tab-content">
      <!-- 文章 tab -->
      <div v-show="activeTab === 'articles'" class="tab-panel">
        <a v-for="a in paginatedArticles" :key="a.url" :href="a.url" class="sidebar-article-item">
          {{ a.title }}
        </a>
        <div v-if="totalArticlePages > 1" class="sidebar-pagination">
          <button @click="articlePage--" :disabled="articlePage <= 1">←</button>
          <span>{{ articlePage }} / {{ totalArticlePages }}</span>
          <button @click="articlePage++" :disabled="articlePage >= totalArticlePages">→</button>
        </div>
      </div>

      <!-- 分类 tab -->
      <div v-show="activeTab === 'categories'" class="tab-panel">
        <a
          v-for="c in categoryGroups"
          :key="c.label"
          :href="withBase(`/blog/categories#${c.category}`)"
          class="sidebar-category-item"
        >
          <span class="category-name">{{ c.label }}</span>
          <span class="category-count">{{ c.count }}</span>
        </a>
      </div>

      <!-- 标签 tab -->
      <div v-show="activeTab === 'tags'" class="tab-panel">
        <div class="sidebar-tag-cloud">
          <a
            v-for="t in tagList"
            :key="t.name"
            :href="withBase(`/blog/tags?tag=${encodeURIComponent(t.name)}`)"
            class="sidebar-tag-item"
          >
            {{ t.name }}
            <span class="tag-count">{{ t.count }}</span>
          </a>
        </div>
      </div>

      <!-- 时间轴 tab -->
      <div v-show="activeTab === 'timeline'" class="tab-panel">
        <div v-for="g in timelineGroups" :key="g.id" class="sidebar-timeline-group">
          <div class="timeline-group-header">
            <span class="timeline-dot"></span>
            <span class="timeline-group-label">{{ g.label }}</span>
            <span class="timeline-group-count">{{ g.items.length }}</span>
          </div>
          <div class="timeline-group-items">
            <a
              v-for="a in (expandedGroups.has(g.id) ? g.items : g.items.slice(0, 5))"
              :key="a.url"
              :href="a.url"
              class="timeline-item-link"
            >
              {{ a.title }}
            </a>
            <span
              v-if="g.items.length > 5"
              class="timeline-more"
              @click="toggleGroup(g.id)"
            >
              {{ expandedGroups.has(g.id) ? '收起' : `...共 ${g.items.length} 篇` }}
            </span>
          </div>
        </div>
      </div>

      <!-- 目录 tab -->
      <div v-show="activeTab === 'outline'" class="tab-panel">
        <a
          v-for="h in headers"
          :key="h.link"
          :href="h.link"
          :style="{ paddingLeft: (h.level - 2) * 12 + 'px' }"
          :class="['blog-outline-link', { active: activeLink === h.link }]"
        >
          {{ h.title }}
        </a>
      </div>
    </div>
  </div>
</template>
