<template>
  <svg viewBox="0 0 63.657 63.657" width="512" height="512"><path d="M31.891 63.657L.012 35.835l2.63-3.014 29.244 25.522 29.123-25.519 2.636 3.008z" :fill="fillColor"/><path d="M29.827 0h4v60h-4z" :fill="fillColor"/></svg>
</template>
<script>
  export default {
    props: {
      fillColor: {
        type: String,
        default: '#aaa'
      }
    }
  }
</script>
