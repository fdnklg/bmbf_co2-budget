import { colors } from 'constants'

export default {
  emissionen: [
    {
      step: '1.1',
      text: {
        title: 'CO₂ Emissionen in Europa',
        paragraph:
          '<strong>30&thinsp;%</strong> der gesamten europäischen CO₂-Emissionen lassen sich auf den Verkehr zurückführen <span class="addition">(Luft, Schiff, Eisenbahn & Straße).</span>',
      },
      meta: {
        title: 'CO₂-Emissionen des Verkehrs innerhalb der EU',
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
        title: 'Straßenverkehr',
        paragraph:
          '<strong class="highlight-orange">72&thinsp;%</strong> der europäischen Verkehrs&shy;emissionen entfallen auf den Straßenverkehr.',
      },
      meta: {
        title: 'CO₂-Emissionen im Straßenverkehr',
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
        title: 'Autos',
        paragraph:
          'Neben Motorrädern, LKWs und leichten Nutzfahrzeugen sind Autos mit <strong class="highlight-orange">60,7&thinsp;%</strong> für den Löwenanteil aller Emissionen im Bereich Verkehr verantwortlich.',
      },
      meta: {
        title: 'CO₂-Emissionen im Straßenverkehr',
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
          customValue: '60,7&thinsp;%',
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
        title: 'Ziele zum Schutz des Klimas',
        paragraph:
          'Die Europäische Union hat sich für die nächsten Jahrzehnte vorgenommen, den Ausstoß klimaschädlicher Treibhausgase zu reduzieren.',
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
        'Abfall',
        'Landwirtschaft',
        'Industrie',
        'Energie',
      ],
    },
    {
      step: '2.2',
      text: {
        title: 'Langsamer Abbau von Emissionen',
        paragraph:
          'Viele Sektoren, wie z.B. <strong class="highlight-land">Landwirtschaft</strong>, <strong class="highlight-energy">Energie</strong>, <strong class="highlight-industry">Industrie</strong> oder <strong class="highlight-waste">Abfall</strong>, haben es seit 1990 geschafft, ihren CO₂ Ausstoß langsam zu verringern.',
      },
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle:
          'Die CO₂-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
        source: {
          url:
            'https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer',
          label: 'Europäisches Parlament',
        },
      },
      highlight: ['Landwirtschaft', 'Industrie', 'Energie', 'Abfall'],
    },
    {
      step: '2.3',
      text: {
        title: 'Steigende Tendenz im Sektor Verkehr',
        paragraph:
          'Während es in den Jahren 2008 bis 2013 eine kurzzeitige Reduktion der Emissionen gab, steigen die Zahlen seit 2014 wieder stetig an und liegen heute bei einem Plus von <strong class="highlight-traffic">23&thinsp;%</strong> gegenüber den Werten von 1990.',
      },
      meta: {
        title: 'CO-2 Emissionen nach Sektoren',
        subtitle:
          'Die CO₂-Emissionen im Verkehr steigen tendenziell eher an, als dass sie sinken.',
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
      text: {},
      map: {
        distance: 50,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO₂-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.2',
      text: {},
      map: {
        distance: 50,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO₂-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.3',
      text: {},
      map: {
        distance: 50,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO₂-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.4',
      text: {},
      map: {
        distance: 50,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO₂-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.5',
      text: {},
      map: {
        distance: 50,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO₂-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
    {
      step: '3.6',
      text: {},
      map: {
        distance: 50,
        diameter: true,
      },
      widget: {
        meta: {
          title: 'Waypoint Start',
        },
        annotation: {
          label: 'Deine CO₂-Emissionen',
          align: 'right',
          x: 100,
        },
        data: [],
      },
    },
  ],
}
