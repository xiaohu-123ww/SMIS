import dayjs from 'dayjs'

export function formatTime (time, format = 1) {
  if (format === 1) {
    return dayjs(time).format('YYYY-MM-DD hh:mm:ss')
  }
}
