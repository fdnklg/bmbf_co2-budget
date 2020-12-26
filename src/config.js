import { d0to5, d5to20, d20to50, d50more } from 'constants'
export const s3Url = 'https://locobss-story-co2.s3.eu-central-1.amazonaws.com/'

export const isoChronesUrl = true ? `data/` : s3Url

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
export const sektorenUrl = 'data/co2_sektoren.csv'

export const distances = {
  hasIntro: true,
  title: 'Wie weit fährst du täglich?',
  subtitle: 'Markiere deine täglich zurückgelegte Strecke.',
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

export const transportTypes = {
  hasIntro: true,
  title: 'Auf welche Weise bewegst du dich fort?',
  subtitle:
    'Wählen Sie einen Mobilitätstyp aus der deinen Gewohnheit sich fortzubewegen deckt.',
  elements: [
    {
      label: 'Fuß / Fahrrad',
      icon: 'bike.svg',
      value: 'bike',
    },
    {
      label: 'ÖPNV',
      icon: 'public.svg',
      value: 'public',
    },
    {
      label: 'Auto+',
      icon: 'car_mf.svg',
      value: 'car_mf',
    },
    {
      label: 'E-Auto',
      icon: 'car.svg',
      value: 'ecar',
    },
    {
      label: 'Auto',
      icon: 'car.svg',
      value: 'car',
    },
  ],
}

export const data = {
  emissionen: {
    start: {
      meta: {
        title: 'CO2-Emissionen des Verkehrs innerhalb der EU',
        subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
        source: {
          label: 'Europäische Umweltagentur',
          url: 'https://www.europarl.europa.eu/',
        },
      },
      annotation: {
        label: 'Verkehrsträger gesamt',
        align: 'right',
        x: 100,
      },
      d: [
        {
          type: 'Straßenverkehr',
          value: 0.72,
          fill: '#3C3372',
          showLabel: true,
        },
        {
          type: 'Zivilluftfahrt',
          value: 0.134,
          fill: '#F2F2F2',
        },
        {
          type: 'Schiffahrt',
          value: 0.136,
          fill: '#F2F2F2',
        },
        {
          type: 'Eisenbahn',
          value: 0.005,
          fill: '#F2F2F2',
        },
        {
          type: 'Andere',
          value: 0.005,
          fill: '#F2F2F2',
        },
      ],
    },
    transition: {
      meta: {
        title: 'CO2-Emissionen im Straßenverkehr',
        subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
        source: {
          label: 'Europäische Umweltagentur',
          url: 'https://www.europarl.europa.eu/',
        },
      },
      annotation: {
        label: 'Anteil Straßenverkehr',
        align: 'right',
        x: 72,
      },
      d: [
        {
          type: 'Straßenverkehr',
          value: 0.72,
          fill: '#3C3372',
          showLabel: true,
        },
        {
          type: 'Andere',
          value: 0.28,
          fill: '#F2F2F2',
          showLabel: false,
        },
      ],
    },
    zoom: {
      meta: {
        subset: 72,
        title: 'CO2-Emissionen im Straßenverkehr',
        subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
        source: {
          label: 'Europäische Umweltagentur',
          url: 'https://www.europarl.europa.eu/',
        },
      },
      annotation: {
        label: 'Anteil Straßenverkehr',
        align: 'right',
        x: 100,
      },
      d: [
        {
          type: 'Motorräder',
          value: 0.012,
          fill: '#E2E0EA',
        },
        {
          type: 'Schwerlaster',
          value: 0.262,
          fill: '#928DB0',
        },
        {
          type: 'Leichte Nutzfahrzeuge',
          value: 0.119,
          fill: '#C5C2D5',
        },
        {
          type: 'Autos',
          value: 0.607,
          fill: '#3C3372',
          showLabel: true,
        },
      ],
    },
  },
}
