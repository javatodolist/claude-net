<script setup lang="ts">
import { data as articles } from '../utils/blogData.data'
import { computed } from 'vue'
import { usePagination } from '../composables/useBlog'
import BlogSidebar from './BlogSidebar.vue'

const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(articles, 10)

function handlePageChange(page: number) {
  goToPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }
  return pages
})

function formatDate(ts: number): string {
  if (!ts) return ''
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <div class="blog-home-layout">
    <div class="blog-main">
      <h1>博客</h1>
      <p style="color: var(--vp-c-text-2); margin-bottom: 32px;">AI编程学习路线图，{{ articles.length }} 篇文章持续更新</p>

      <div class="article-list">
        <a v-for="a in paginatedItems" :key="a.url" :href="a.url" class="article-card">
          <div class="article-cover">
            <img :src="a.cover || '/assets/images/default-cover.jpeg'" :alt="a.title" loading="lazy" />
          </div>
          <div class="article-body">
            <h4>{{ a.title }}</h4>
            <p v-if="a.excerpt" class="article-excerpt">{{ a.excerpt }}</p>
            <div class="meta">
              <span class="category-badge">{{ a.categoryLabel }}</span>
              <span v-if="a.tag" class="tag-badge">{{ a.tag }}</span>
              <span v-if="a.date" class="date-text">{{ formatDate(a.date) }}</span>
            </div>
          </div>
        </a>
      </div>

      <div v-if="totalPages > 1" class="pagination">
        <button :disabled="currentPage === 1" @click="handlePageChange(currentPage - 1)">上一页</button>
        <template v-for="p in pageNumbers" :key="p">
          <span v-if="p === '...'" class="pagination-ellipsis">...</span>
          <button v-else :class="{ active: p === currentPage }" @click="handlePageChange(p as number)">{{ p }}</button>
        </template>
        <button :disabled="currentPage === totalPages" @click="handlePageChange(currentPage + 1)">下一页</button>
      </div>
    </div>

    <aside class="blog-sidebar">
      <BlogSidebar />
    </aside>
  </div>
</template>
