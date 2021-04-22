import { dsvFormat } from 'd3-dsv'
import union from '@turf/union'
import difference from 'turf-difference'
import bboxPolygon from '@turf/bbox-polygon'
import bbox from '@turf/bbox'

export const createFeature = (path, style) => {
  let coords = path
    .split(';')
    .map((c) => c.split(',').map((cc) => parseFloat(cc)))

  const geojson = {
    type: 'Feature',
    properties: style,
    geometry: {
      type: 'Polygon',
      coordinates: [coords],
    },
  }

  return geojson
}

export const createBoundingBox = (cutOutFeat) => {
  let united = false
  if (cutOutFeat && cutOutFeat.length > 1) {
    // better save than sorry
    // cutOutFeat = cutOutFeat.map((feat) => {
    //   const polys = unkinkPolygon(cleanCoords.default(feat))
    //   return polys.features[0]
    // })

    // there were problems with some polygons not willing to be combined
    // after some trial and error it looks like polygons that are within another polygon are the problem
    // so we simply either ignore or replace those...
    united = cutOutFeat[0]
    for (let i = 1; i < cutOutFeat.length; i += 1) {
      const bb1 = bbox(united)
      const bb2 = bbox(cutOutFeat[i])

      // bb2 in bb1
      if (
        bb2[0] > bb1[0] &&
        bb2[0] < bb1[2] &&
        bb2[1] > bb1[1] &&
        bb2[1] < bb1[3] &&
        bb2[2] > bb1[0] &&
        bb2[2] < bb1[2] &&
        bb2[3] > bb1[1] &&
        bb2[3] < bb1[3]
      ) {
        // ignore this one its within united
      } else if (
        bb1[0] > bb2[0] &&
        bb1[0] < bb2[2] &&
        bb1[1] > bb2[1] &&
        bb1[1] < bb2[3] &&
        bb1[2] > bb2[0] &&
        bb1[2] < bb2[2] &&
        bb1[3] > bb2[1] &&
        bb1[3] < bb2[3]
      ) {
        united = cutOutFeat[i]
      } else {
        // looks like there is an overlap
        united = union.default(united, cutOutFeat[i])
      }
    }
  }

  let bboxEurope = [-5.2288281645, 42.0255985816, 25.622332041, 58.9956007543]
  let bboxEuropeFeat
  if (united) {
    bboxEuropeFeat = difference(bboxPolygon.default(bboxEurope), united)
  }

  return {
    type: 'Feature',
    id: 'boundingBox',
    properties: {
      id: 'bounding-box',
      fill: '#fff',
      'fill-opacity': 0.85,
      'stroke-opacity': 0,
    },
    geometry: {
      type: 'Polygon',
      coordinates: united ? bboxEuropeFeat.geometry.coordinates : [],
    },
  }
}

export const createCircle = (center, radiusInKm, style) => {
  const points = 64

  const coords = {
    latitude: center[1],
    longitude: center[0],
  }

  const km = radiusInKm

  const ret = []
  const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180))
  const distanceY = km / 110.574

  let theta, x, y
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI)
    x = distanceX * Math.cos(theta)
    y = distanceY * Math.sin(theta)

    ret.push([coords.longitude + x, coords.latitude + y])
  }
  ret.push(ret[0])

  return {
    type: 'Feature',
    properties: { ...style, id: 'distance' },
    geometry: {
      type: 'Polygon',
      coordinates: [ret],
    },
  }
}

export const createGeojson = () => {
  return {
    type: 'FeatureCollection',
    features: [],
  }
}

const parse = (str, delimiter) => {
  const csv = dsvFormat(delimiter)
  const parsed = csv.parse(str)
  return parsed.columns
}
