import html2canvas from 'html2canvas'
import Canvas2Image from '@/utils/canvas2image.js'
// 生成快照
function createBaseCanvas(scale, width, height) {
  // 创建canvas画布
  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = height * scale
  // canvas.width = width
  // canvas.height = height
  const context = canvas.getContext('2d')
  // 关闭抗锯齿
  context.mozImageSmoothingEnabled = false
  context.webkitImageSmoothingEnabled = false
  context.msImageSmoothingEnabled = false
  context.imageSmoothingEnabled = false
  // 控制缩放
  // context.scale(scale / 4, scale / 4)
  // context.scale(scale, scale);
  // 画布背景
  context.fillStyle = '#fff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  return canvas
}
export default function corvertImage(container, options = {}) {
  // 以当前设备决定图片的缩放倍数
  const scale = window.devicePixelRatio
  // 获取节点宽高
  const width = container.offsetWidth
  const height = container.offsetHeight
  // 创建画布
  const canvas = createBaseCanvas(scale, width, height)
  // 配置项
  const ops = {
    scale,
    canvas,
    useCORS: true,
    allowTaint: false,
    backgroundColor: null,
    ...options
  }
  return html2canvas(container, ops).then(canvas => {
    const imageEl = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height)
    return imageEl
  })
}
