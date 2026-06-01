<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">粤ICP备2024313371号-1</a>
      <span class="sep">|</span>
      <span>AI巴士</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 24px;
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.site-footer a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.site-footer a:hover {
  color: var(--vp-c-brand-1);
}

.sep {
  color: var(--vp-c-divider);
}
</style>
