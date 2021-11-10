<template>
  <div class="index-box">
    <hello-world></hello-world>
    <div @click="handleClickMe">click me</div>
    {{ hello }}
  </div>
</template>
<script lang="ts">
export default {
  setup() {
    const router = useRouter()
    const handleClickMe = () => {
      router.push('/me')
    }
    return {
      handleClickMe
    }
  },
  asyncData() {
    return {
      hello: 'message'
    }
  }
}
</script>

<style lang="scss" scoped>
.index-box {
  text-align: center;
  margin-top: 30vh;
  font-weight: bold;
  font-size: 13px;
}
.date {
  font-size: 8px;
  color: red;
}
</style>
