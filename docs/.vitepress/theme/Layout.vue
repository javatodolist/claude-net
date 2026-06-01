<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import FloatingToolbar from './components/FloatingToolbar.vue'
import BlogSidebar from './components/BlogSidebar.vue'
import Footer from './components/Footer.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
const route = useRoute()

const BLOG_UTILITY_PATHS = ['/blog/', '/blog/categories', '/blog/tags', '/blog/timeline']
const BLOG_CATEGORIES = [
  'claude-code-guide', 'ai-programming-tools', 'ai-tool-guides',
  'vibe-coding-tips', 'vibe-coding-practice', 'ai-product-monetization', 'codex-cli',
]

// 博客文章详情页：有 VPDocAside，可注入 #aside-top
const isBlogArticlePage = computed(() => {
  const p = route.path
  const isBlogArticle = p.startsWith('/blog/') && !BLOG_UTILITY_PATHS.some(u => p === u || p.startsWith(u + '.'))
  const isOtherBlogCat = BLOG_CATEGORIES.some(cat => p.startsWith('/' + cat + '/'))
  return isBlogArticle || isOtherBlogCat
})
</script>

<template>
  <Layout>
    <template v-if="isBlogArticlePage" #aside-top>
      <div class="blog-sidebar-aside">
        <BlogSidebar />
      </div>
    </template>
    <template #layout-bottom>
      <FloatingToolbar v-if="frontmatter.layout !== 'home'" />
      <Footer />
    </template>
  </Layout>
</template>
