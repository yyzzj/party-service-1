/*
 * @Author: 庞泽邦
 * @Date: 2020-05-21 11:25:41
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-10 14:58:14
 */
//视频播放组件
<template>
  <div class="test_two_box">
    <video
      ref="myVideo"
      class="video-js vjs-default-skin vjs-big-play-centered color"
      webkit-playsinline="true"
      x-webkit-airplay="true"
      playsinline="true"
      x5-playsinline
      x5-video-player-fullscreen="true"
      x5-video-orientation="portraint"
    />
  </div>
</template>

<script>
import videojs from 'video.js'
/* 不能直接引入js，否则会报错：videojs is not defined
import 'video.js/dist/lang/zh-CN.js' */
import video_zhCN from 'video.js/dist/lang/zh-CN.json'
import video_en from 'video.js/dist/lang/en.json'
import 'video.js/dist/video-js.css'

videojs.addLanguage('zh-CN', video_zhCN)
videojs.addLanguage('en', video_en)
export default {
  name: 'Video',
  data: () => {
    return {
      player: null
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()// 销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
    }
  },
  methods: {
    init() {
      // 避免初始化不彻底，导致获取不到相对应的媒体资源；选择采用this.$nextTick()方法，利用其中的回调函数，使得DOM渲染刷新后再次获取video所需的相关数据，促使再次视图更新
      this.$nextTick(() => {
        const video = this.$refs.myVideo
        // eslint-disable-next-line
       this.player = videojs(video, {
          controls: true, // 是否显示控制条
          poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590046299954&di=ba8cdd8c23a33a07f59d2c82eb50bfe4&imgtype=0&src=http%3A%2F%2Fdiy.yesky.com%2Fimagelist%2F2008%2F245%2Fl1b0j594q0db.jpg', // 视频封面图地址
          preload: 'auto',
          autoplay: false,
          fluid: true, // 自适应宽高
          language: 'zh-CN', // 设置语言
          muted: false, // 是否静音
          inactivityTimeout: false,
          controlBar: {
            'currentTimeDisplay': true,
            'timeDivider': true,
            'durationDisplay': true,
            'remainingTimeDisplay': false,
            // 'volumeBar': true,
            // 'liveui': true,
            // volumePanel: {
            //   inline: true
            // },
            VolumeControl: true,
            /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
            children: [
              { name: 'playToggle' }, // 播放按钮
              { name: 'currentTimeDisplay' }, // 当前已播放时间
              { name: 'progressControl' }, // 播放进度条
              { name: 'durationDisplay' }, // 总时间
              { // 倍数播放
                name: 'playbackRateMenuButton',
                'playbackRates': [0.5, 0.75, 1, 1.5, 2]
              },
              {
                name: 'volumePanel', // 音量控制
                inline: false // 不使用水平方式
              },
              //   { name: 'volumeBar' },
              { name: 'FullscreenToggle' } // 全屏
            ]
          },
          sources: [ // 视频源
            // {
            //   src: '//vjs.zencdn.net/v/oceans.mp4',
            //   type: 'video/mp4'
            // },
            {
              src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
              // type必须要与视频源一致否则在ios端会出现无法解析的问题
              type: 'video/mp4'
            }
          ]
        }, function() {
        //   this.playbackRate(3)
          var vol = document.getElementsByClassName('vjs-mute-control')
          this.on('timeupdate', function() {
            videojs.log('播放结束了!')
          })
          console.log('视频可以播放了', vol)
        })
        console.log(document.getElementsByClassName('vjs-control-bar'))
        // this.player.controlBar.blur(() => {
        //   console.log('111')
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.color /deep/.vjs-play-progress {
    background-color: #dc0b21;
    /*background-color: #ffb845;*/
}
.color /deep/ .vjs-volume-level{
    background-color: #dc0b21;
}
</style>
