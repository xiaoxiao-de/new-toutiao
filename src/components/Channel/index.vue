<template>
  <div class="channel-container">
    <!-- 我的频道 -->
   <van-cell :border="false">
    <div slot="title" class="title-text">我的频道</div>
    <van-button type="danger"  plain round size="mini" class="edit-btn" @click="isEdit = !isEdit">
      {{ isEdit ? '完成' : '编辑'}}</van-button>
   </van-cell>
    <van-grid :gutter="10" class="my-grid">
       <van-grid-item class="grid-item"
       v-for="(item,index) in mychannels"
       :key="index"
       @click="onMyChannelClick(item,index)"
        >
        <van-icon slot="icon" name="clear" v-show="isEdit && !fiexChannel.includes(item.id)"></van-icon>
        <span class="text" :class="{ active: index === active}" slot="text">{{ item.name }}</span>
       </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
    <div slot="title" class="title-text">频道推荐</div>
   </van-cell>
    <van-grid :gutter="10" class="recommend">
       <van-grid-item  class="grid-item" v-for="(item,index) in recommend" :key="index"
       icon="plus" :text="item.name "  @click="onAdd(item)"/>
    </van-grid>
  </div>
</template>
<script>
import { getchannel, addChannelList, deleteChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/stroage'

export default {
  name: 'Channel',
  created () {
    this.loadChannel()
  },
  props: {
    mychannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannelList: [], // 所有数组
      isEdit: false, // 编辑状态显示
      fiexChannel: [0] // 固定频道不允许被删除
    }
  },
  methods: {
    async loadChannel () {
      try {
        const { data } = await getchannel()
        this.allChannelList = data.data.channels
      } catch (err) {
        this.$toast('获取失败', err)
      }
    },
    async  onAdd (value) {
      this.mychannels.push(value)

      if (this.user) {
        // 已登入把数据请求接口放在线上
        try {
          await addChannelList({
            id: value.id, // 频道id
            seq: this.mychannels.length // 序号
          })
        } catch (err) {
          this.$toast('保存失败,请稍后重试', err)
        }
      } else {
        // 未登入把数据存在本地
        setItem('TOUTIAO', this.mychannels)
      }
    },
    onMyChannelClick (item, index) {
      if (this.isEdit) {
        if (this.fiexChannel.includes(item.id)) {
          return
        }
        this.mychannels.splice(index, 1)
        // 编辑状态执行删除频道
        if (index <= this.active) {
          // 让激活频道索引减一
          this.$emit('updata-active', this.active - 1, true)
        }
        this.deleteChannel(item)
      } else {
        // 非编辑状态执行切换频道
        this.$emit('updata-active', index, false)
      }
    },
    async deleteChannel (item) {
      try {
        if (this.user) {
          await deleteChannels(item.id)
        } else {
          setItem('toutiao', this.mychannels)
        }
      } catch (err) {
        this.$toast('操作失败')
      }
    }
  },
  computed: {
    ...mapState(['user']),
    // 频道推荐
    recommend () {
      return this.allChannelList.filter(item => {
        return !this.mychannels.find(mychannels => {
          return mychannels.id === item.id
        })
      })
    }
  }
}
</script>
<style lang="less" scpoed>
.channel-container {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .grid-item {
    width: 160px;
    height: 86px;
   .van-grid-item__content {
     white-space: nowrap;
     background-color: #f4f5f6;
     .van-grid-item__text, .text {
       font-size: 28px;
       color: #222;
       margin-top: 0;
     }
     .active {
      color: #f85959;
     }
     .van-grid-item__icon-wrapper {
       position: unset;
     }
   }
  }
  .recommend {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
         .van-grid-item__text {
           margin-top: 0;
         }
      }
    }
  }
  .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

}
</style>
