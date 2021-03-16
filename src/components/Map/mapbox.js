import { Map, ScaleControl, AttributionControl } from 'mapbox-gl'

// mapbox.accessToken = __env__.isProd
//   ? process.env.MAPBOX_TOKEN
//   : __env__.MAPBOX_ACCESS_TOKEN;

const Scale = ScaleControl

const Attribution = AttributionControl

const accessToken =  __env__.MAPBOXKEY

const key = {}

export { Map, key, accessToken, Scale, Attribution }
