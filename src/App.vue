<template>
  <div class="wrap">
    <header>
      <RouterLink to="/">第一堂課作業</RouterLink>
      <RouterLink to="/second">第二堂課作業</RouterLink>
      <RouterLink to="/third">第三堂課作業</RouterLink>
      <!-- <RouterLink to="/">第四堂課作業</RouterLink> -->
    </header>
    <RouterView />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

body {
  width: 100vw;
  overflow-x: hidden;
  * {
    font-family: 'Roboto', 'Noto Sans TC', sans-serif;
  }
}
.wrap {
  max-width: 1200px;
  width: 88%;
  margin: 0 auto;
}
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
