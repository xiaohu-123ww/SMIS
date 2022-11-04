
// 图片处理
export function disposeImg (img) {
  if (img !== undefined) {
    img = String(img)

    if (img.substr(0, 1) == '/') {
      img = img.substr(1)
    }

    return 'http://1.13.8.165/' + img
  }
}
