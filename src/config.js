// const {protocol, hostname} = window.location
// const PORT = global.PORT
const NO_API = !!global.NO_API
// const API_URL = global.API_URL
// let apiBaseURL = ''
// if (API_URL) {
//   apiBaseURL = `${protocol}//${API_URL}`
// } else {
//   apiBaseURL = `${protocol}//${hostname}${PORT ? `:${PORT}` : ''}`
// }

const apiBaseURL = 'http://localhost:3000/'

const config = {
  application: 'Sample Application',
  environment: global.NODE_ENV,
  version: global.VERSION,
  admin: {
    name: 'myname',
    email: 'myemail@gmail.com'
  },
  gitVersion: global.gitVersion,
  apiBaseURL: apiBaseURL,
  /**
   * If this is set to true, the no API calls are made.  Instead, each component generates its own random data.
   */
  makeNoServerApiCalls: NO_API
}

// set map base layer
if (global.NODE_ENV === 'production' ||
    global.NODE_ENV === 'dev' ||
    global.NODE_ENV === 'staging' ||
    global.NODE_ENV === 'sandbox') {
  config.mapBaseLayerURL =
      'http://netgeo.vh.eng.vzwcorp.com/arcgis/rest/services/basemap_webmer/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
} else {
  config.mapBaseLayerURL =
      'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
}

export default config
