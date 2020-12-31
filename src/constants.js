export const isLocal = true

export const d0to5 = 5
export const d5to20 = 10
export const d20to50 = 25
export const d50more = 50

export const co2PerKm = {
  plane: 380,
  car: 130,
  ecar: 90,
  car_mf: 45,
  public: 25,
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
