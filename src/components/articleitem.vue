<template>
    <van-cell class="acticle-item"
    :to="`/articles/${article.art_id}`">
      <!-- 文章内容 -->
      <div slot="title" class="title van-multi-ellipsis--l2"> {{ article.title }}</div>
      <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-wrap">
         <div class="cover-item" v-for="(item,index) in article.cover.images" :key="index">
            <van-image
            class="cover-item-img"
          :src="item"
          fit="cover"
        />
         </div>
        </div>
        <div class="label-item">
          <span>{{ article.aut_name}}</span>
          <span>{{ article.comm_count}}评论</span>
          <span> {{ article.pubdate|relativetime}}</span>
        </div>
      </div>
        <van-image
          v-if="article.cover.type === 1"
          slot="default"
          class="right-cover"
          fit="cover"
          :src="article.cover.images[0]"
        />
    </van-cell>
</template>
<script>
export default {
  name: 'articleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  }
}
</script>
<style lang="less" scoped>
.acticle-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-item {
    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
