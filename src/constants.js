export const isLocal = true

export const d0to5 = 5
export const d5to20 = 10
export const d20to50 = 25
export const d50more = 50

export const co2PerKm = {
  plane: 380,
}

export const colors = {
  car: {
    main: '#E79D67',
    light: '#E5C3AA',
  },
  ecar: {
    main: '#E9CD68',
    light: '#EEE1B2',
  },
  car_mf: {
    main: '#85C2A5',
    light: '#ABD0BE',
  },
  public: {
    main: '#87AAAB',
    light: '#ABC4C4',
  },
  bike: {
    main: '#404455',
    light: '#868994',
  },
  plane: {
    main: '#E77667',
    light: '#EA9C92',
  },
  neutral: {
    main: '#f8f8f8',
    light: '#f2f2f2',
  },
}

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
