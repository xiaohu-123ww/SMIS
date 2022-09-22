export function disposeImg (img) {
  if (img !== undefined) {
    img = String(img)

    if (img.substr(0, 1) == '/') {
      img = img.substr(1)
    }

    return 'https://znzz.tech/' + img
  }
}
