<template>
    <van-icon :name="value ? 'star': 'star-o'"  class="comment-icon"
    :class="{ bgstyle: value}" @click="onCollect" :lodding="lodding"/>
</template>
<script>
import { UserCollection, cancelCollections } from '@/api/article'
export default {
  name: 'Collect',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    article_id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      lodding: false
    }
  },
  methods: {
    async onCollect () {
      this.lodding = true
      try {
        if (this.value) {
          await cancelCollections(this.article_id)
        } else {
          await UserCollection(this.article_id)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '收藏失败')
      } catch (err) {
        this.$toast('收藏失败,请重试')
      }
      this.lodding = false
    }
  }
}
</script>
<style lang="less" scoped>
.bgstyle {
  .van-icon {
      color: #ffa500;
  }
}
</style>
