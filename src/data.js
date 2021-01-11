import { colors } from 'constants'

export default {
  emissionen: [
    {
      step: '1.1',
      text: {
        title: 'CO-2 Emissionen aller Verkehrs- und Transportmittel in Europa',
        paragraph:
          'Die individuelle Mobilität hat einen spürbaren Einfluss auf den Klimawandel. Erfahre, wie nachhaltig deine Art der Mobilität ist und du ändern kannst, um einen positiven Beitrag zu leisten.',
      },
      meta: {
        title: 'CO2-Emissionen des Verkehrs innerhalb der EU',
        subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
        source: {
          label: 'Europäische Umweltagentur',
          url: 'https://www.europarl.europa.eu/',
        },
      },
      annotation: {
        label:
          'CO-2 Emissionen aller Verkehrs- und Transportmittel innerhalb Europas',
        align: 'right',
        textAlign: 'right',
        x: 100,
      },
      d: [
        {
          type: 'Alle Verkehrsträger',
          value: 1,
          format: 'percent',
          fill: colors.car.main,
          showValue: true,
          showLabel: true,
        },
      ],
    },
    {
      step: '1.2',
      text: {
        title: 'CO2-Emissionen des Verkehrs innerhalb der EU',
        paragraph:
          'Die individuelle Mobilität hat einen spürbaren Einfluss auf den Klimawandel. Erfahre, wie nachhaltig deine Art der Mobilität ist und du ändern kannst, um einen positiven Beitrag zu leisten.',
      },
      meta: {
        title: 'CO2-Emissionen im Straßenverkehr',
        subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
        source: {
          label: 'Europäische Umweltagentur',
          url: 'https://www.europarl.europa.eu/',
        },
      },
      annotation: {
        label: 'Anteil der Emissionen verursacht durch Straßenverkehr',
        align: 'right',
        textAlign: 'right',
        x: 72,
      },
      d: [
        {
          type: 'Straßenverkehr',
          format: 'percent',
          value: 0.72,
          fill: colors.car.main,
          showLabel: true,
          showValue: true,
        },
        {
          type: 'Andere',
          value: 0.28,
          format: 'percent',
          fill: colors.neutral.light,
          showLabel: false,
        },
      ],
    },
    {
      step: '1.3',
      text: {
        title: 'CO2-Emissionen des Verkehrs innerhalb der EU',
        paragraph:
          'Die individuelle Mobilität hat einen spürbaren Einfluss auf den Klimawandel. Erfahre, wie nachhaltig deine Art der Mobilität ist und du ändern kannst, um einen positiven Beitrag zu leisten.',
      },
      meta: {
        title: 'CO2-Emissionen im Straßenverkehr',
        subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
        source: {
          label: 'Europäische Umweltagentur',
          url: 'https://www.europarl.europa.eu/',
        },
      },
      annotation: {
        label: 'Anteil der Emissionen verursacht durch Autos im Straßenverkehr',
        align: 'left',
        x: 43,
      },
      d: [
        {
          type: 'Autos',
          value: 0.43,
          format: 'percent',
          customValue: '60&thinsp;%',
          fill: colors.car.main,
          showLabel: true,
          showValue: true,
        },
        {
          type: 'Straßenverkehr',
          value: 0.29,
          format: 'percent',
          fill: colors.car.light,
        },
        {
          type: 'Alle Verkehrsträger',
          value: 0.28,
          format: 'percent',
          fill: colors.neutral.light,
        },
      ],
    },
  ],
  sektoren: [
    {
      step: '2.1',
      text: {
        title: 'Emissionen über Zeit nach Sektoren',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      meta: {
        source: {
          url:
            'https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer',
          label: 'Europäisches Parlament',
        },
      },
      highlight: [
        'Verkehr',
        'Land-, Forstwirtschaft, Fischerei',
        'Landwirtschaft',
        'Industrie',
        'Energie',
      ],
    },
    {
      step: '2.2',
      text: {
        title: 'Sektoren, die heute weniger Emissionen produzieren als 1990',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle:
          'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
        source: {
          url:
            'https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer',
          label: 'Europäisches Parlament',
        },
      },
      highlight: ['Landwirtschaft', 'Industrie', 'Energie'],
    },
    {
      step: '2.3',
      text: {
        title: 'Steigende Tendenz im Sektor Verkehr',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle:
          'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
        source: {
          url:
            'https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer',
          label: 'Europäisches Parlament',
        },
      },
      highlight: ['Verkehr'],
    },
  ],
  szenarien: [
    {
      step: '3.1',
      text: {
        title: 'Szenarien Titel 01',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        zipcode: 41372,
        distance: 50,
        zoom: 6.2,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.2',
      text: {
        title: 'Szenarien Titel 02',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        zipcode: 41372,
        distance: 50,
        zoom: 8.2,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.3',
      text: {
        title: 'Szenarien Titel 03',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        zipcode: 41372,
        distance: 50,
        zoom: 8.2,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.4',
      text: {
        title: 'Szenarien Titel 04',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        zipcode: 41372,
        distance: 50,
        zoom: 8.2,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.5',
      text: {
        title: 'Szenarien Titel 04',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        zipcode: 41372,
        distance: 50,
        zoom: 8.2,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.6',
      text: {
        title: 'Szenarien Titel 04',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.',
      },
      map: {
        zipcode: 41372,
        distance: 50,
        zoom: 8.2,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
  ],
}
