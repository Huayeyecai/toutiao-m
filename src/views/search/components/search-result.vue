<template>
<div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell
      v-for="(article, index) in list"
      :key="index"
      :title="article.title" />
    </van-list>
</div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        //  请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页数量，不传每页数量由后端决定
          q: this.searchText // 搜索关键词
        })
        // console.log(data)
        // 将数据添加至列表
        const { results } = data.data
        this.list.push(...results)
        // 将本次加载中的loading关闭
        this.loading = false
        // 判断是否还有数据
        if (results.length) {
        // 有，更新下一个数据页码
          this.page++
        } else {
        // 没有，加载状态finished设置为结束
          this.finished = true
        }
      } catch (err) {
        // 展示加载失败的提示状态
        this.error = true

        this.loading = false
        this.$toast('获取失败，稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
