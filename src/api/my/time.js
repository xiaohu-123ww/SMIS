import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
export function useCountDown (startCount) {
  const time = ref(0)
  const { pause, resume } = useIntervalFn(() => {
    /* your function */
    if (time.value <= 0) {
      pause()
      return
    }
    time.value--
  }, 1000)
  const start = () => {
    time.value = startCount || 60
    resume()
  }
  return {
    time,
    start,
    pause,
    resume
  }
}
