<template>
  <header>
    <div class="container">
      <h1>{{this.title}}</h1>

      <div>
        <slot/>
      </div>

    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>

<style scoped src="./../css/components/header.css"></style>