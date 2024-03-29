import { colors } from 'constants'
import { scaleQuantile } from 'd3-scale'
import { co2Colors, extent } from 'constants'

const co2_today = 11 // t
const co2_model_low = 1 // t
const co2_model_high = 2.7 // t
const mobility_share = 23 // %
const days_per_week = 5

const co2_perday_today =
  (((co2_today / 100) * mobility_share) / (52 * days_per_week)) * 1000 * 1000 // gr
const co2_perday_model_low =
  (((co2_model_low / 100) * mobility_share) / (52 * days_per_week)) *
  1000 *
  1000 // gr
const co2_perday_model_high =
  (((co2_model_high / 100) * mobility_share) / (52 * days_per_week)) *
  1000 *
  1000 // gr

const performance_2050_car = 10 // %
const performance_2050_ecar = 50 // %
const performance_2050_public = 30 // %

const multiplier_carmf = 1 / 2
const multiplier_ecar = 1 / 2
const multiplier_public = 1 / 2.63

export const emiss = (base, value) => {
  return base * (base / value)
}

export const emissDistance = (type, distance) => {
  let multiplier = 1
  const CO2PerKm = 250
  if (type === 'car_mf') {
    multiplier = multiplier_carmf
  }
  if (type === 'ecar') {
    multiplier = multiplier_ecar
  }
  if (type === 'public') {
    multiplier = multiplier_public
  }
  return distance * (CO2PerKm * multiplier)
}

export const emissions = {
  car_2020: emiss(co2_perday_today, co2_perday_today), // 9700
  car_2050_min: emiss(
    co2_perday_model_low,
    co2_perday_model_low *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car)
  ), // 990
  car_2050_max: emiss(
    co2_perday_model_high,
    co2_perday_model_high *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car)
  ), // 2640
  car_2050_bike_min: emiss(
    co2_perday_model_low,
    (co2_perday_model_low *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car) *
      5) /
      3
  ), // 1650
  car_2050_bike_max: emiss(
    co2_perday_model_high,
    (co2_perday_model_high *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car) *
      5) /
      3
  ), // 4400

  car_mf_2020: emiss(
    co2_perday_today * multiplier_carmf,
    co2_perday_today * multiplier_carmf
  ), // 19400
  car_mf_2050_min: emiss(
    co2_perday_model_low * multiplier_carmf,
    co2_perday_model_low *
      multiplier_carmf *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car)
  ), // 1980
  car_mf_2050_max: emiss(
    co2_perday_model_high * multiplier_carmf,
    co2_perday_model_high *
      multiplier_carmf *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car)
  ), // 5280
  car_mf_2050_bike_min: emiss(
    co2_perday_model_low * multiplier_carmf,
    (co2_perday_model_low *
      multiplier_carmf *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car) *
      5) /
      3
  ), // 3300
  car_mf_2050_bike_max: emiss(
    co2_perday_model_high * multiplier_carmf,
    (co2_perday_model_high *
      multiplier_carmf *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car) *
      5) /
      3
  ), // 8800

  ecar_2020: emiss(
    co2_perday_today * multiplier_ecar,
    co2_perday_today * multiplier_ecar
  ), // 19400
  ecar_2050_min: emiss(
    co2_perday_model_low * multiplier_ecar,
    co2_perday_model_low *
      multiplier_ecar *
      (1 + (1 / (100 - performance_2050_ecar)) * performance_2050_ecar)
  ), // 3600
  ecar_2050_max: emiss(
    co2_perday_model_high * multiplier_ecar,
    co2_perday_model_high *
      multiplier_ecar *
      (1 + (1 / (100 - performance_2050_ecar)) * performance_2050_ecar)
  ), // 9600
  ecar_2050_bike_min: emiss(
    co2_perday_model_low * multiplier_ecar,
    (co2_perday_model_low *
      multiplier_ecar *
      (1 + (1 / (100 - performance_2050_ecar)) * performance_2050_ecar) *
      5) /
      3
  ), // 6000
  ecar_2050_bike_max: emiss(
    co2_perday_model_high * multiplier_ecar,
    (co2_perday_model_high *
      multiplier_ecar *
      (1 + (1 / (100 - performance_2050_ecar)) * performance_2050_ecar) *
      5) /
      3
  ), // 16000

  public_2020: emiss(
    co2_perday_today * multiplier_public,
    co2_perday_today * multiplier_public
  ), // 37830
  public_2050_min: emiss(
    co2_perday_model_low * multiplier_public,
    co2_perday_model_low *
      multiplier_public *
      (1 + (1 / (100 - performance_2050_public)) * performance_2050_public)
  ), // 5019
  public_2050_max: emiss(
    co2_perday_model_high * multiplier_public,
    co2_perday_model_high *
      multiplier_public *
      (1 + (1 / (100 - performance_2050_public)) * performance_2050_public)
  ), // 13384
  public_2050_bike_min: emiss(
    co2_perday_model_low * multiplier_public,
    (co2_perday_model_low *
      multiplier_public *
      (1 + (1 / (100 - performance_2050_public)) * performance_2050_public) *
      5) /
      3
  ), // 8365
  public_2050_bike_max: emiss(
    co2_perday_model_high * multiplier_public,
    (co2_perday_model_high *
      multiplier_public *
      (1 + (1 / (100 - performance_2050_public)) * performance_2050_public) *
      5) /
      3
  ), // 22308

  bike_2050_car_min: emiss(
    co2_perday_model_low,
    co2_perday_model_low *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car) *
      5
  ), // 4950
  bike_2050_car_max: emiss(
    co2_perday_model_high,
    co2_perday_model_high *
      (1 + (1 / (100 - performance_2050_car)) * performance_2050_car) *
      5
  ), // 13200
  bike_2050_public_min: emiss(
    co2_perday_model_low * multiplier_public,
    co2_perday_model_low *
      multiplier_public *
      (1 + (1 / (100 - performance_2050_public)) * performance_2050_public) *
      5
  ), // 23666
  bike_2050_public_max: emiss(
    co2_perday_model_high * multiplier_public,
    co2_perday_model_high *
      multiplier_public *
      (1 + (1 / (100 - performance_2050_public)) * performance_2050_public) *
      5
  ), // 66924
}

export const divideEven = (min, max, parts) => {
  const getDiff = (a, b) => {
    return Math.abs(a - b)
  }

  const difference = getDiff(min, max)
  const part = difference / parts

  let arr = Array.from(Array(parts + 1).keys())
  arr = arr.map((d) => d * part)

  return arr
}

export const getColorScale = (
  time = '2020',
  model = false,
  isStroke = false
) => {
  let timeCurrent
  let key
  if (time == '2020') timeCurrent = 'today'
  if (time == '2050') timeCurrent = 'future'

  if (model === 'min') {
    key = `${timeCurrent}_min`
  } else if (model === 'max') {
    key = `${timeCurrent}_max`
  } else {
    key = `${timeCurrent}`
  }

  return scaleQuantile()
    .domain(extent[key])
    .range(co2Colors.map((c) => c[isStroke ? 'main' : key]))
}

// use for production data
// export const sets = {
//   'car': [[],['car_2020'], ['car_2050_min', 'car_2050_max'], ['public_2050_min', 'public_2050_max'], ['car_2050_bike_min', 'car_2050_bike_max']],
//   'car_mf': [[],['car_mf_2020'], ['car_mf_2050_min', 'car_mf_2050_max'], ['public_2050_min', 'public_2050_max'], ['car_mf_2050_bike_min', 'car_mf_2050_bike_max']],
//   'ecar': [[],['ecar_2020'], ['ecar_2050_min', 'ecar_2050_max'], ['public_2050_min', 'public_2050_max'], ['ecar_2050_bike_min', 'ecar_2050_bike_max']],
//   'public': [[],['public_2020'], ['public_2050_min', 'public_2050_max'], ['car_2050_min', 'car_2050_max'], ['public_2050_bike_min', 'public_2050_bike_max']],
//   'bike': [[],['car_2020'], ['car_2050_min', 'car_2050_max'], ['bike_2050_car_min', 'bike_2050_car_max'], ['bike_2050_public_min', 'bike_2050_public_max']]
// };

// for local data
export const sets = {
  car: [
    [],
    [],
    ['car_2020'],
    ['car_2050_min', 'car_2050_max'],
    ['public_2050_min', 'public_2050_max'],
    ['car_2050_bike_min', 'car_2050_bike_max'],
  ],
  car_mf: [
    [],
    [],
    ['car_mf_2020'],
    ['car_mf_2050_min', 'car_mf_2050_max'],
    ['public_2050_min', 'public_2050_max'],
    ['car_mf_2050_bike_min', 'car_mf_2050_bike_max'],
  ],
  ecar: [
    [],
    [],
    ['ecar_2020'],
    ['ecar_2050_min', 'ecar_2050_max'],
    ['public_2050_min', 'public_2050_max'],
    ['ecar_2050_bike_min', 'ecar_2050_bike_max'],
  ],
  public: [
    [],
    [],
    ['public_2020'],
    ['public_2050_min', 'public_2050_max'],
    ['car_2050_min', 'car_2050_max'],
    ['public_2050_bike_min', 'public_2050_bike_max'],
  ],
  bike: [
    [],
    [],
    ['car_2020'],
    ['car_2050_min', 'car_2050_max'],
    ['bike_2050_car_min', 'bike_2050_car_max'],
    ['bike_2050_public_min', 'bike_2050_public_max'],
  ],
}

// isochrone / widget config
// @IMPORTANT: Has to match with the number of waypoints
export const setsNew = {
  car: [
    [
      {
        iso: null,
        highlight: true,
        annotation: 'Deine CO₂-Emissionen pro 100 km',
      },
    ],
    [{ iso: null, highlight: true, annotation: 'distance' }],
    [
      {
        iso: 'car_2020',
        highlight: true,
        annotation: 'Ø-Emissionen eines Autos in Deutschland',
      },
      { iso: null, highlight: false },
    ],
    [
      {
        iso: 'car_2050_max',
        highlight: true,
        annotation: 'Emissionen: Einhaltung der Klimaziele 2050',
      },
      { iso: 'car_2050_min', highlight: false },
      { iso: null, annotation: 'distance', highlight: false },
    ],
    [
      {
        iso: 'public_2050_max',
        highlight: true,
        annotation: 'public_2050_max',
      },
      { iso: 'public_2050_min', highlight: false },
      { iso: null, highlight: false },
    ],
    [
      {
        iso: 'car_2050_bike_max',
        highlight: true,
        annotation: 'car_2050_bike_max',
      },
      { iso: 'car_2050_bike_min', highlight: false },
      { iso: null, highlight: false },
    ],
  ],
  car_mf: [
    [{ iso: null, highlight: true, annotation: 'distance' }],
    [{ iso: null, highlight: true, annotation: 'distance' }],
    [
      { iso: 'car_mf_2020', highlight: true, annotation: 'car_mf_2020' },
      { iso: null, highlight: false },
    ],
    [
      {
        iso: 'car_mf_2050_max',
        highlight: true,
        annotation: 'car_mf_2050_max',
      },
      { iso: 'car_mf_2050_min', highlight: false },
      { iso: null, highlight: false },
    ],
    [
      {
        iso: 'public_2050_max',
        highlight: true,
        annotation: 'public_2050_max',
      },
      { iso: 'public_2050_min', highlight: false },
      { iso: null, highlight: false },
    ],
    [
      {
        iso: 'car_mf_2050_bike_max',
        highlight: true,
        annotation: 'car_mf_2050_bike_max',
      },
      { iso: 'car_mf_2050_bike_min', highlight: false },
      { iso: null, highlight: false },
    ],
  ],
  ecar: [
    [{ iso: null, highlight: true, annotation: 'distance' }],
    [{ iso: null, highlight: true, annotation: 'distance' }],
    [
      { iso: 'ecar_2020', highlight: true, annotation: 'ecar_2020' },
      { iso: null, highlight: false },
    ],
    [
      { iso: 'ecar_2050_max', highlight: true, annotation: 'ecar_2050_max' },
      { iso: 'ecar_2050_min', highlight: false },
      { iso: null, highlight: false },
    ],
    [
      {
        iso: 'public_2050_max',
        highlight: true,
        annotation: 'public_2050_max',
      },
      { iso: 'public_2050_min', highlight: false },
      { iso: null, highlight: false },
    ],
    [
      {
        iso: 'ecar_2050_bike_max',
        highlight: true,
        annotation: 'ecar_2050_bike_max',
      },
      { iso: 'ecar_2050_bike_min', highlight: false },
      { iso: null, highlight: true, annotation: 'distance' },
    ],
  ],
  public: [
    [{ iso: null, highlight: true, annotation: 'distance' }],
    [{ iso: null, highlight: true, annotation: 'distance' }],
    [
      { iso: 'public_2020', highlight: true, annotation: 'public_2020' },
      { iso: null, highlight: false },
    ],
    [
      // { iso: 'public_2050_min', highlight: false},
      {
        iso: 'public_2050_max',
        highlight: true,
        annotation: 'public_2050_max',
      },
      {
        iso: 'public_2050_min',
        highlight: true,
        annotation: 'public_2050_min',
      },
      { iso: null, highlight: false },
    ],
    [
      // { iso: 'public_2050_min', highlight: false},
      {
        iso: 'car_2050_max',
        highlight: true,
        annotation: 'car_2050_max',
      },
      {
        iso: 'car_2050_min',
        highlight: true,
        annotation: 'car_2050_min',
      },
      { iso: null, highlight: false },
    ],
    [
      // { iso: 'public_2050_bike_min', highlight: false},
      {
        iso: 'public_2050_bike_max',
        highlight: true,
        annotation: 'public_2050_bike_max',
      },
      {
        iso: 'public_2050_bike_min',
        highlight: true,
        annotation: 'public_2050_bike_min',
      },
      { iso: null, highlight: false },
    ],
  ],
  bike: [
    [{ iso: null, highlight: true, annotation: 'distance' }],
    [{ iso: null, highlight: true, annotation: 'distance' }],
    [
      { iso: 'car_2020', highlight: true, annotation: 'car_2020' },
      { iso: null, highlight: false },
    ],
    [
      { iso: 'car_2050_min', highlight: true, annotation: 'car_2050_min' },
      { iso: 'car_2050_max', highlight: true, annotation: 'car_2050_max' },
      { iso: null, highlight: false },
    ],
    [
      { iso: 'bike_2050_car_min', highlight: false },
      {
        iso: 'bike_2050_car_max',
        highlight: true,
        annotation: 'bike_2050_car_max',
      },
      { iso: null, highlight: false },
    ],
    [
      { iso: 'bike_2050_public_min', highlight: false },
      {
        iso: 'bike_2050_public_max',
        highlight: true,
        annotation: 'bike_2050_public_max',
      },
      { iso: null, highlight: false },
    ],
  ],
}

export const widgetColors = (name) => {
  if (name.includes('ecar')) return colors.ecar.main
  if (name.includes('car_mf')) return colors.car_mf.main
  if (name.includes('public')) return colors.public.main
  if (name.includes('bike')) return colors.bike.main
  if (name.includes('car')) return colors.car.main
  if (name.includes('plane')) return colors.plane.main
  return '#EFF0F0'
}
