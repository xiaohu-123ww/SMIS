/**
 * 工具类
 * AES加密
 * 特别注意：（1）AES加密中需要前后端共同协商一个密文(密钥),用来加密/解密的（2）偏移量。
 * l36DoqKUYQP0N7e1 代表此次密文
 */
import CryptoJS from 'crypto-js'

// CBC模式
export default {
  // 特别注意：此次是将密文写死到函数内部，也可以当成函数的参数进行动态绑定密文,列如：
  encrypt (word) {
    const keyStr = 'l36DoqKUYQP0N7e1' // 密钥

    const ivStr = '131b0c8a7a6e072e' // 偏移量

    const key = CryptoJS.enc.Utf8.parse(keyStr) // 解析后的key

    const iv = CryptoJS.enc.Utf8.parse(ivStr) // 解析后的iv

    const srcs = CryptoJS.enc.Utf8.parse(word)

    const encrypted = CryptoJS.AES.encrypt(srcs, key, {

      iv: iv,

      mode: CryptoJS.mode.CBC,

      padding: CryptoJS.pad.Pkcs7

    })

    return encrypted.toString()
  },
  // 解密
  decrypt (word) {
    const keyStr = 'l36DoqKUYQP0N7e1'

    const ivStr = '131b0c8a7a6e072e'

    const base64 = CryptoJS.enc.Utf8.parse(word) // Base64解密

    var key = CryptoJS.enc.Utf8.parse(keyStr) // 解析后的key

    const iv = CryptoJS.enc.Utf8.parse(ivStr) // 解析后的iv

    const src = CryptoJS.enc.Utf8.stringify(base64) // Base64解密

    var decrypt = CryptoJS.AES.decrypt(src, key, { // AES解密

      iv,

      mode: CryptoJS.mode.CBC,

      padding: CryptoJS.pad.Pkcs7

    })

    return decrypt.toString(CryptoJS.enc.Utf8)
  }
}
