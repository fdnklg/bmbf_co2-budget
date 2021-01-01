import { d0to5, d5to20, d20to50, d50more, isLocal } from 'constants'
export const s3Url = 'https://locobss-story-co2.s3.eu-central-1.amazonaws.com/'

export const isoChronesUrl = isLocal ? `data/` : s3Url

export const spaceTypes = {
  51: 'Metropolen',
  52: 'Großstädt',
  53: 'Mittelstädten',
  54: 'Städtischen Raum',
  55: 'Kleinstädtischen oder dörflichen Raum',
}

export const colorsSektoren = [
  {
    name: 'Verkehr',
    color: 'red',
  },
  {
    name: 'Land-, Forstwirtschaft, Fischerei',
    color: 'grey',
  },
  {
    name: 'Energie',
    color: 'grey',
  },
  {
    name: 'Landwirtschaft',
    color: 'grey',
  },
  {
    name: 'Industrie',
    color: 'grey',
  },
]

export const zipcodesUrl = `${s3Url}postcodes.txt`
export const airportsUrl = `${isLocal ? 'data/' : s3Url}airports.csv`
export const sektorenUrl = 'data/co2_sektoren.csv'

export const navItems = [
  {
    id: 'start',
    label: 'Start',
    offsetY: -400,
  },
  {
    id: '1.0',
    label: 'Sektoren',
    offsetY: '50%',
    items: [
      {
        id: '1.1',
        label: 'Alle Verkehrsträger',
        offsetY: -400,
      },
      {
        id: '1.2',
        label: 'Straßenverkehr',
        offsetY: -400,
      },
      {
        id: '1.3',
        label: 'Autos',
        offsetY: -400,
      },
    ],
  },
  {
    id: '2.0',
    label: 'Emissionen',
    offsetY: -400,
    items: [
      {
        id: '2.1',
        label: 'Alle Verkehrsträger',
        offsetY: -400,
      },
      {
        id: '2.2',
        label: 'Straßenverkehr',
        offsetY: -400,
      },
      {
        id: '2.3',
        label: 'Autos',
        offsetY: -400,
      },
    ],
  },
  {
    id: '3.0',
    label: 'Szenarien',
    offsetY: -400,
    items: [
      {
        id: '3.1',
        label: 'Dein Reisestil',
        offsetY: -25,
      },
      {
        id: '3.2',
        label: 'Deutscher Durchschnitt',
        offsetY: -25,
      },
      {
        id: '3.3',
        label: 'Klimaziele 2050',
        offsetY: -25,
      },
      {
        id: '3.4',
        label: 'Mobilitätsmix',
        offsetY: -25,
      },
      {
        id: '3.5',
        label: 'Das Rad',
        offsetY: -25,
      },
    ],
  },
  {
    id: '4.0',
    label: 'Fliegen',
    offsetY: -300,
  },
  {
    id: 'end',
    label: 'Zusammenfassung',
    offsetY: -400,
  },
]

export const nav = [
  {
    id: '1.0',
  },
]

export const distances = {
  hasIntro: true,
  title: 'Wie weit fährst du täglich?',
  subtitle: 'Wähle die Strecke die du im Durchschnitt zurücklegst.',
  elements: [
    {
      label: '',
      isHTML: true,
      icon:
        '<div class="distWrapper"><span class="dist">5</span><span class="metric">km</span></div>',
      value: d0to5,
    },
    {
      label: '',
      isHTML: true,
      icon:
        '<div class="distWrapper"><span class="dist">10</span><span class="metric">km</span></div>',
      value: d5to20,
    },
    {
      label: '',
      isHTML: true,
      icon:
        '<div class="distWrapper"><span class="dist">25</span><span class="metric">km</span></div>',
      value: d20to50,
    },
    {
      label: '',
      isHTML: true,
      icon:
        '<div class="distWrapper"><span class="dist">50</span><span class="metric">km</span></div>',
      value: d50more,
    },
  ],
}

const travelTypeItems = [
  {
    label: 'Fuß / Fahrrad',
    icon: 'bike.svg',
    value: 'bike',
    ride: {
      singular: 'Radfahrt',
      plural: 'Radfahrten',
    },
  },
  {
    label: 'ÖPNV',
    icon: 'public.svg',
    value: 'public',
    ride: {
      singular: 'Zugfahrt',
      plural: 'Zugfahrten',
    },
  },
  {
    label: 'Auto+',
    icon: 'car_mf.svg',
    iconExtra: 'car_mf_extra',
    value: 'car_mf',
    ride: {
      singular: 'Autofahrt (2 Personen)',
      plural: 'Autofahrten (2 Personen)',
    },
  },
  {
    label: 'E-Auto',
    icon: 'car.svg',
    iconExtra: 'ecar_extra',
    value: 'ecar',
    ride: {
      singular: 'Elekto-Autofahrt (1 Person)',
      plural: 'Elektro-Autofahrten (1 Person)',
    },
  },
  {
    label: 'Auto',
    icon: 'car.svg',
    value: 'car',
    ride: {
      singular: 'Autofahrt (1 Person)',
      plural: 'Autofahrten (1 Person)',
    },
  },
]

export const travelTypes = {
  hasIntro: true,
  title: 'Welcher Reisetyp bist du?',
  subtitle: 'Wähle ein Fortbewegnungsmittel.',
  elements: travelTypeItems,
}

export const travelTypesRides = {
  hasIntro: true,
  title: 'Vergleiche deinen Flug mit anderen Reisezielen.',
  subtitle: 'Wähle ein Fortbewegnungsmittel.',
  elements: travelTypeItems.filter((d) => d.value !== 'bike'),
}

export const airportsIntro = {
  title: 'Wohin bist du das letzte Mal geflogen?',
  subtitle: 'Wähle Start- und Ziel-Flughafen aus.',
}
