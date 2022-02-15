<template>
        <!-- v-if="value" -->
     <van-button
            v-if="isFollowed"
            class="follow-btn"
            round
            size="small"
            :loading="loading"
            @click="onFollow"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="loading"
            @click="onFollow"
          >关注</van-button>

</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  components: {},
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    // value: {
    //   type: Boolean,
    //   required: true
    // },
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
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
    async onFollow () {
      // 开启按钮的 loading 状态
      this.loading = true
      try {
        // if (this.value) {
        if (this.isFollowed) {
          // 如果已关注，则取消关注
          await deleteFollow(this.userId)
        } else {
          // 否则添加关注
          await addFollow(this.userId)
        }
        // 更新视图
        // this.article.is_followed = !this.article.is_followed
        // this.$emit('input', !this.value)
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '无法关注自己'
        }
        this.$toast(message)
      }
      // 关闭按钮的 loading 状态
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
