<template>
  <header>
    <RouterLink to="/">第一堂課作業</RouterLink>
    <RouterLink to="/second">第二堂課作業</RouterLink>
    <!-- <RouterLink to="/">第三堂課作業</RouterLink>
    <RouterLink to="/">第四堂課作業</RouterLink> -->
  </header>
  <RouterView />
</template>
<style lang="scss">
header {
  margin-bottom: 40px;
  a {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 10px;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #bbb;
  }
}
</style>
