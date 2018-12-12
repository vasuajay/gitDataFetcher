const {localStorage} = window
const storageKey = 'my-app'

export default {
  set (data = {}) {
    if (localStorage) {
      const currentData = this.get()
      const newData = Object.assign({}, currentData || {}, data)

      localStorage.setItem(storageKey, JSON.stringify(newData))
    }
  },
  get (key) {
    const data = localStorage ? JSON.parse(localStorage.getItem(storageKey)) : null

    return key && data ? data[key] : data
  },
  clear () {
    localStorage && localStorage.removeItem(storageKey)
  }
}
