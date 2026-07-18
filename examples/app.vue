<template>
  <div class="demo-site">
    <header class="demo-site__header">
      <div>
        <strong>Vue Minder 3</strong>
        <span>Vue 3 脑图组件 / Mind-map component</span>
      </div>
      <nav>
        <a href="https://github.com/jiangtao/vue-minder" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.npmjs.com/package/vue-minder" target="_blank" rel="noreferrer">npm</a>
      </nav>
    </header>
    <main class="demo-site__main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body,
#app,
.demo-site {
  height: 100%;
  margin: 0;
}

.demo-site {
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.demo-site__header {
  min-height: 56px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  color: #fff;
  background: #263238;
}

.demo-site__header strong {
  margin-right: 12px;
  font-size: 20px;
}

.demo-site__header span {
  color: #cfd8dc;
}

.demo-site__header nav {
  display: flex;
  gap: 16px;
}

.demo-site__header a {
  color: #fff;
}

.demo-site__main {
  flex: 1;
  min-height: 0;
  position: relative;
}
</style>
