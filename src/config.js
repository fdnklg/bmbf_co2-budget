import { d0to5, d5to20, d20to50, d50more, isLocal, content } from 'constants'
import { getWindowDimensions } from 'utils'

const dimensions = getWindowDimensions()

export const s3Url = 'https://locobss-story-co2.s3.eu-central-1.amazonaws.com/'

export const isoChronesUrl = isLocal ? `data/` : s3Url

export const activeProject = 'maps'

export const metadata = {
  authors: 'Sebastian Meier | @seb_meier, Fabian Dinklage | @fdnklg',
  lang: 'de',
  twitter_site: '@seb_meier',
  twitter_creator: '',
  url: 'https://co2-mobilitaet.vislab.io',
  title: 'Wie weit komme ich mit meinem CO2-Budget?',
  description:
    'Unsere individuelle Mobilität hat einen spürbaren Einfluss auf den Klimawandel. Erfahre mehr darüber, wie nachhaltig deine Form der Mobilität ist.',
  image: 'https://co2-mobilitaet.vislab.io/data/social_media.jpg',
}

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
    name: 'Abfall',
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
export const airportsUrl = `${s3Url}airports.csv`
export const sektorenUrl = 'data/co2_sektoren.csv'

export const navItems = [
  // {
  //   id: 'start',
  //   label: 'Start',
  //   offsetY: -400,
  // },
  {
    id: '1.0',
    label: 'Emissionen',
    offsetY: '50%',
    items: [
      {
        id: '1.1',
        label: 'Alle Verkehrsträger',
        offsetY: -(dimensions[1] / 2),
      },
      {
        id: '1.2',
        label: 'Straßenverkehr',
        offsetY: -(dimensions[1] / 2),
      },
      {
        id: '1.3',
        label: 'Autos',
        offsetY: -(dimensions[1] / 2),
      },
    ],
  },
  {
    id: '2.0',
    label: 'Sektoren',
    offsetY: -(dimensions[1] / 2),
    items: [
      {
        id: '2.1',
        label: 'Alle Verkehrsträger',
        offsetY: -(dimensions[1] / 2),
      },
      {
        id: '2.2',
        label: 'Straßenverkehr',
        offsetY: -(dimensions[1] / 2),
      },
      {
        id: '2.3',
        label: 'Autos',
        offsetY: -(dimensions[1] / 2),
      },
    ],
  },
  {
    id: '3.0',
    label: 'Szenarien',
    offsetY: -(dimensions[1] / 2),
    items: [
      {
        id: '3.1',
        label: 'Dein Reisestil',
        offsetY: -55,
      },
      {
        id: '3.2',
        label: 'Deutscher Durchschnitt',
        offsetY: -55,
      },
      {
        id: '3.3',
        label: 'Klimaziele 2050',
        offsetY: -55,
      },
      {
        id: '3.4',
        label: 'Mobilitätsmix',
        offsetY: -55,
      },
      {
        id: '3.5',
        label: 'Das Rad',
        offsetY: -55,
      },
    ],
  },
  {
    id: '4.0',
    label: 'Fliegen',
    offsetY: -(dimensions[1] / 2),
  },
  {
    id: 'end',
    label: 'Über das Projekt',
    offsetY: -(dimensions[1] / 2),
  },
]

export const distances = {
  hasIntro: true,
  title: 'Wie weit fährst du täglich?',
  subtitle: 'Wähle die Strecke, die du im Durchschnitt zurücklegst.',
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
    label: 'Auto  <br/> (1 P.)',
    icon: 'car.svg',
    value: 'car',
    ride: {
      singular: 'Autofahrt (1 P.)',
      plural: 'Autofahrten (1 P.)',
    },
  },
  {
    label: 'E-Auto <br/> (1 P.)',
    icon: 'car.svg',
    iconExtra: 'ecar_extra',
    value: 'ecar',
    ride: {
      singular: 'Elekto-Autofahrt (1 P.)',
      plural: 'Elektro-Autofahrten (1 P.)',
    },
  },
  {
    label: 'Auto <br/> (2 P.)',
    icon: 'car_mf.svg',
    iconExtra: 'car_mf_extra',
    value: 'car_mf',
    ride: {
      singular: 'Autofahrt (2 P.)',
      plural: 'Autofahrten (2 P.)',
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
    label: 'Fuß / Fahrrad',
    icon: 'bike.svg',
    value: 'bike',
    ride: {
      singular: 'Radfahrt',
      plural: 'Radfahrten',
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
  title: 'Vergleiche deinen Flug mit anderen Fortbewegungs&shy;mitteln.',
  subtitle: 'Wähle ein Fortbewegungs&shy;mittel.',
  elements: travelTypeItems
    .filter((d) => d.value !== 'bike')
    .map((d) => {
      return d
    }),
}

export const airportsIntro = {
  title: 'Wohin bist du das letzte Mal geflogen?',
  subtitle: 'Wähle Start- und Ziel-Flughafen aus.',
}
