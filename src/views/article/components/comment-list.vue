<template>
<div class="commit-list">
<van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
      :immediate-check="false"
    >
    <comment-item
    v-for="(item, index) in list"
    :key="index"
    :comment="item"
    @reply-click="$emit('reply-click', $event)"
    />
       </van-list>
</div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loading = true
    this.onLoad()
  },
  mounted () {},
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 每页大小
        })
        // 2.将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 将评论总数量传递到外部
        this.$emit('onload-success', data.data)
        // 3.将loading设置为false
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
        //    有 更新获取下一页数据页码
          this.offset = data.data.last_id
        } else {
        //    没有 将finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}

</script>

<style lang="less" scoped>

</style>
