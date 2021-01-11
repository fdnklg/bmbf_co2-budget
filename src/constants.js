export const isLocal = false

export const d0to5 = 5
export const d5to20 = 10
export const d20to50 = 25
export const d50more = 50

export const extent = {
  today: [0, 11000],
  future_min: [0, 2700],
  future_max: [0, 1000],
}

export let stepScenario = '4.0'

export const co2PerKm = {
  plane: 380,
  car: 130,
  ecar: 90,
  car_mf: 45,
  public: 25,
}

export const appendix = {
  sources: [
    ['https://urlhere.com', 'url label here'],
    ['https://urlhere.com', 'url label here'],
    ['https://urlhere.com', 'url label here'],
    ['https://urlhere.com', 'url label here'],
  ],
  method:
    'Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles eröffnen und auseinander setzen, was jener Begründer der Wahrheit und gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles eröffnen und auseinander setzen, was jener Begründer der Wahrheit und gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.',
}

export const legendText = {
  future:
    'Prognostizierte CO2 Emissionen in kg für Reisetyp zur Einhaltung der Klimaziele 2050',
  today: 'CO2 Emissionen in kg für Reisedistanz und Reisetyp',
}

export const colors = {
  car: {
    main: '#E79D67',
    light: '#FBF0E8',
  },
  ecar: {
    main: '#E9CD68',
    light: '#FCF7E8',
  },
  car_mf: {
    main: '#85C2A5',
    light: '#EDF6F1',
  },
  public: {
    main: '#87AAAB',
    light: '#EDF2F2',
  },
  bike: {
    main: '#404455',
    light: '#E2E3E5',
  },
  plane: {
    main: '#E77667',
    light: '#FBEAE8',
  },
  neutral: {
    main: '#f8f8f8',
    light: '#f2f2f2',
  },
}

export const co2Colors = [
  {
    label: 'keine',
    main: '#404354',
    today: '#555B71',
    future_max: '#888DA5',
    future_min: '#A8ACBD',
  },
  {
    label: 'wenig',
    main: '#507172',
    today: '#699596',
    future_max: '#A5BFC0',
    future_min: '#C3D5D5',
  },
  {
    label: 'mittel',
    main: '#448868',
    today: '#63B18C',
    future_max: '#92C9AE',
    future_min: '#BBDDCD',
  },
  {
    label: 'hoch',
    main: '#C09C1B',
    today: '#DBB11F',
    future_max: '#E9CD68',
    future_min: '#EFDA90',
  },
  {
    label: 'sehr hoch',
    main: '#B05B1C',
    today: '#E0813B',
    future_max: '#E79D67',
    future_min: '#EEB891',
  },
]

export const colorsSektoren = {
  Verkehr: colors.plane,
  'Land-, Forstwirtschaft, Fischerei': colors.public,
  Industrie: colors.car_mf,
  Landwirtschaft: colors.bike,
  Energie: colors.ecar,
}

export const offsetsSektoren = {
  Verkehr: 8,
  'Land-, Forstwirtschaft, Fischerei': 12,
  Energie: 8,
  Landwirtschaft: 11.5,
  Industrie: 3,
}
