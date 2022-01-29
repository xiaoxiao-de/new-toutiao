<template>
  <div class="article_container">
      <!-- 导航标题 -->
      <van-nav-bar title="文章详情" fixed>
      <van-icon slot="left" name="arrow-left" @click="$router.back()"/>
    </van-nav-bar>
    <!-- loading状态加载 加载中-->
    <van-loading size="24px" vertical class="outside" v-if="lodding">加载中...</van-loading>
    <!-- 文章详情 -->
    <div class="article_detail" v-else-if="articleList.title">
      <!-- 文章标题 -->
      <h1 class="article_title">{{articleList.title}}</h1>
      <!-- 用户信息 -->
      <van-cell class="user-info" center :border="false">
      <div class="left_layout">
      <van-image
        class="avatar"
        slot="icon"
        round
        fit="cover"
        :src="articleList.aut_photo"
        />
        <div class="lauout_item">
      <div slot="title" class="user_name">{{articleList.aut_name}}</div>
      <div slot="label" class="user_data">{{articleList.pubdate | relativetime}}</div>
        </div>
      </div>
      <div class="right_layout">
      <van-button type="info" round icon="plus" size="small"
      v-if="articleList.is_followed" @click="onFollow" :loading = 'followLoading'>已关注</van-button>
       <van-button type="info" round icon="plus" size="small" v-else @click="onFollow" :loading = 'followLoading'>关注</van-button>
      </div>
      </van-cell>
       <div class="article_style markdown-body"
       v-html="articleList.content"
       ref="articleListContent"></div>
       <van-divider>结束</van-divider>
        <!-- 底部区域 -->
          <div class="article_bottom">
           <div class="bom_btn">
               <van-button type="default" round class="comment">写评论</van-button>
           </div>
           <div class="bom_icon">
                <van-icon
      class="comment-icon"
      name="comment-o"
      badge="20"
    />
      <!-- <van-icon name="star-o"  class="comment-icon"/> -->
      <Collect v-model="articleList.is_collected" :article_id="articleList.art_id"></Collect>
       <van-icon name="good-job-o"  class="comment-icon" />
       <van-icon name="share-o"  class="comment-icon" />
           </div>
       </div>
      </div>
         <!-- 加载失败 -->
       <div class="error_warp" v-else-if="errStatus === 404">
           <van-icon name="failure" />
           <p class="text">该资源不存在或已删除</p>
       </div>
       <div class="error_warp" v-else>
           <van-icon name="failure" />
           <p class="text">内容加载失败</p>
           <van-button type="default" class="reset_btn" @click="loadArticle">点击重试</van-button>
       </div>
    </div>
</template>
<script>
import { getArticleDetails, getUserCancel, getUserFollow } from '@/api/article'
import { ImagePreview } from 'vant'
import Collect from '@/components/collect'
// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   // 起始位置
//   startPosition: 1,
//   onClose () {
//     console.log(1)
//   }
// })
export default {
  name: 'articles',
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    Collect
  },
  data () {
    return {
      articleList: [], // 文章数组
      lodding: true, // 加载状态
      errStatus: 0, // 错误状态码
      followLoading: false // 按钮加载状态
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    //   文章详情
    async loadArticle () {
      this.lodding = true
      try {
        const { data } = await getArticleDetails(this.articleId)
        this.articleList = data.data
        setTimeout(() => {
          this.preImage()
        }, 0)
        // 加载状态
        // this.lodding = false
        console.log(this.articleList)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取文章详情失败,请稍后再试')
      }
      // 无论加载成功或失败lodding都需要关闭
      this.lodding = false
    },
    // 文章图片
    preImage () {
      // 所有img节点
      const articleListContent = this.$refs.articleListContent
      const imgs = articleListContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            // 起始位置
            startPosition: index
          })
        }
      })
    },
    // 用户关注/取消
    async onFollow () {
      this.followLoading = true
      try {
        if (this.articleList.is_followed) {
          // 取消关注
          await getUserCancel(this.articleList.aut_id)
        //   console.log(data)
        } else {
          // 关注用户
          await getUserFollow(this.articleList.aut_id)
        //   console.log(data)
        }
        this.articleList.is_followed = !this.articleList.is_followed
      } catch (err) {
        let message = '操作失败,请重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注自己'
        }
        this.$toast(message)
      }
      this.followLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
@import "./github-markdown.css";
.article_detail {
    width: 100%;
   .article_title {
        padding-left: 32px;
        margin-top: 110px;
        font-size: 38px;
    }
    .avatar {
        width: 96px;
        height: 96px;
    }
    .user_name {
        font-size: 22px;
    }
    .user_data {
        font-size: 18px;
        color: #D3D3D3;
    }
    .van-cell__value {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .left_layout {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .lauout_item {
        padding-left: 18px;
    }
}
.error_warp {
    height: 410px;
    text-align: center;
    margin-bottom: 100px;
    .van-icon {
        font-size: 300px;
        color: #D3D3D3;
    }
    .reset_btn {
        width: 320px;
        height: 80px;
        margin-bottom: 200px;
    }
}
.outside {
    padding-top: 200px;
}
.article_bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #D3D3D3;
    background-color: #eee;
    width: 100%;
    height: 92px;
    line-height: 92px;
    text-align: center;
    .comment {
        width: 212px;
        margin-bottom: 20px;
    }
    .comment-icon {
        width: 92px;
        height: 92px;
        line-height: 92px;
    }
    .van-icon {
        font-size: 42px;
    }
}
.van-nav-bar {
  background-color: #3296fa;
 /deep/ .van-nav-bar__title,.van-icon {
    color: #fff;
  }
}
.article_style {
    width: 750px;
}
.van-divider {
    margin-bottom: 110px;
}
</style>
