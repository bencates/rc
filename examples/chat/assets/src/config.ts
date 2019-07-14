export const SOCKET_URL = `${
  window.location.protocol === 'https:' ? 'wss' : 'ws'
}://${window.location.hostname}:4000/socket`
