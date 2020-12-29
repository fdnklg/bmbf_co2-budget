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

export const transportTypes = {
  hasIntro: true,
  title: 'Welcher Reisetyp bist du?',
  subtitle: 'Wähle ein Fortbewegnungsmittel.',
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
      iconExtra: 'car_mf_extra',
      value: 'car_mf',
    },
    {
      label: 'E-Auto',
      icon: 'car.svg',
      iconExtra: 'ecar_extra',
      value: 'ecar',
    },
    {
      label: 'Auto',
      icon: 'car.svg',
      value: 'car',
    },
  ],
}
