<template>
  <div class="movie">
    <img
      :src="movie.Poster"
      alt="" />
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>