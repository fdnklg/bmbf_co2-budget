
const data = {
  emissions: {
    meta: {
      title: 'CO2-Emissionen des Verkehrs innerhalb der EU',
      subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
      src: '<a class="source" href="https://www.europarl.europa.eu/">Europäische Umweltagentur</a>'
    },
    annotation: {
      label: 'Verkehrsträger gesamt',
      align: 'right',
      x: 100
    },
    d: [
      {
        type: 'Straßenverkehr',
        value: .72,
        fill: '#3C3372',
        showLabel: true
      },
      {
        type: 'Zivilluftfahrt',
        value: .134,
        fill: '#F2F2F2',
      },
      {
        type: 'Schiffahrt',
        value: .136,
        fill: '#F2F2F2',
      },
      {
        type: 'Eisenbahn',
        value: .005,
        fill: '#F2F2F2',
      },
      {
        type: 'Andere',
        value: .005,
        fill: '#F2F2F2',
      },
    ],
  },
  emissionsDetail: {
    meta: {
      subset: 70.2,
      title: 'CO2-Emissionen im Straßenverkehr',
      subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
      src: '<a class="source" href="https://www.europarl.europa.eu/">Europäische Umweltagentur</a>'
    },
    annotation: {
      label: 'Anteil Straßenverkehr',
      align: 'right',
      x: 100
    },
    d: [
      {
        type: 'Motorräder',
        value: .012,
        fill: '#E2E0EA'
      },
      {
        type: 'Schwerlaster',
        value: .262,
        fill: '#928DB0'
      },
      {
        type: 'Leichte Nutzfahrzeuge',
        value: .119,
        fill: '#C5C2D5'
      },
      {
        type: 'Autos',
        value: .607,
        fill: '#3C3372',
        showLabel: true
      },
    ],
  }
}

export default data;