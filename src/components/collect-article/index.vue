<template>
<van-button
  :icon="value ? 'star' : 'star-o' "
  :class="{
      collected: value
      }"
      @click="onCollect"
      :loading="loading"
      />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onCollect () {
    // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
    //   this.$toast.loading({
    //     duration: 0, // 持续展示 toast
    //     message: '操作中...',
    //     forbidClick: true // 是否禁止背景点击
    // })
      this.loading = true
      try {
        // 如果已收藏，则取消收藏
        // if (this.article.is_collected) {
        if (this.value) {
          await deleteCollect(this.articleId)
          // this.article.is_collected = false
        } else {
        // 添加收藏
          await addCollect(this.articleId)
          // this.article.is_collected = true
        }
        this.$emit('input', !this.value)
        // this.article.is_collected = !this.article.is_collected
        this.$toast.success(this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败，请重新尝试')
      }
      this.loading = false
    }
  }
}

</script>

<style lang="less" scoped>
.collected {
    .van-icon {
        color: #ffa500;
    }
}
</style>
