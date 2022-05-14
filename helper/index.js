import { notification } from 'antd'

export const setNotification = (message) => {
  if (!message) {
    message = 'No message yet.'
  }
  notification['success']({
    message
  })
}
