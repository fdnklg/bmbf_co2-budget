import { colors } from 'constants'

export default {
  emissionen: [
    {
      step: 1.0,
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
      step: 1.1,
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
      step: 1.2,
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
  sektoren: {
    start: {
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle: 'Hier steht die zweite Überschrift',
        src:
          '<a class="source" href="https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer">Europäisches Parlament</a>',
      },
      highlight: [],
      annotation: [],
    },
    verkehr: {
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle:
          'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
        src:
          '<a class="source" href="https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer">Europäisches Parlament</a>',
      },
      highlight: ['Verkehr'],
      annotation: [
        {
          label: 'Verkehr',
          color: 'red',
          x: 2012,
          y: 110,
        },
      ],
    },
    landwirtschaft: {
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle:
          'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
        src:
          '<a class="source" href="https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer">Europäisches Parlament</a>',
      },
      highlight: ['Land-, Forstwirtschaft, Fischerei'],
      annotation: [
        {
          label: 'Land-, Forstwirtschaft, Fischerei',
          color: 'grey',
          x: 2009,
          y: 120,
        },
      ],
    },
    end: {
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle:
          'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
        src:
          '<a class="source" href="https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer">Europäisches Parlament</a>',
      },
      highlight: [],
      annotation: [],
    },
  },
  szenarien: {
    start: {
      zipcode: 41372,
      distance: 50,
      zoom: 8.2,
      diameter: true,
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO2-Emissionen',
          align: 'right',
          x: 100,
        },
        d: [],
      },
    },
    szenarioEins: {
      zipcode: 41372,
      distance: 50,
      zoom: 7.9,
      diameter: true,
      widget: {
        meta: {
          title: 'Waypoint Szenario Eins',
        },
        annotation: {
          label: 'Anteil Straßenverkehr',
          align: 'right',
          x: 100,
        },
        d: [],
      },
    },
    szenarioZwei: {
      zipcode: 41372,
      distance: 50,
      zoom: 8.2,
      diameter: true,
      widget: {
        meta: {
          title: 'Waypoint Scenario Zwei',
        },
        annotation: {
          label: 'Anteil Straßenverkehr',
          align: 'right',
          x: 100,
        },
        d: [],
      },
    },
    szenarioDrei: {
      zipcode: 41372,
      distance: 50,
      zoom: 7.9,
      diameter: true,
      widget: {
        meta: {
          title: 'Waypoint Scenario Drei',
        },
        annotation: {
          label: 'Anteil Straßenverkehr',
          align: 'right',
          x: 100,
        },
        d: [],
      },
    },
    szenarioVier: {
      zipcode: 41372,
      distance: 50,
      zoom: 7.9,
      diameter: true,
      widget: {
        meta: {
          title: 'Waypoint Scenario Drei',
        },
        annotation: {
          label: 'Anteil Straßenverkehr',
          align: 'right',
          x: 100,
        },
        d: [],
      },
    },
    end: {
      zipcode: 41372,
      distance: 50,
      zoom: 7.9,
      diameter: true,
      widget: {
        meta: {
          title: 'Waypoint End',
        },
        annotation: {
          label: 'Anteil Straßenverkehr',
          align: 'right',
          x: 100,
        },
        d: [],
      },
    },
  },
}
