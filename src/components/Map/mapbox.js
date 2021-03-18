import { Map, ScaleControl, AttributionControl } from 'mapbox-gl'

const Scale = ScaleControl

const Attribution = AttributionControl

const accessToken =  __env__.MAPBOXKEY

const key = {}

export { Map, key, accessToken, Scale, Attribution }
