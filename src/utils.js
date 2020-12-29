import { dsvFormat } from 'd3-dsv'
import { colorsSektoren, offsetsSektoren } from 'constants'

export const lightenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

export const parseDataEmissionen = (data) => {
  const emissionenData = data.emissionen

  let transformedData = []

  emissionenData.map((item) => {
    item.d = item.d
      .sort((a, b) => b.value - a.value)
      .map((d) => {
        d.x = parseFloat((d.value * 100).toFixed(1))
        d.y = 1
        return d
      })
    transformedData.push(item)
  })

  return transformedData
}

export const parseDataSektoren = (data, config) => {
  config = config.sektoren

  const keys = Object.keys(config)
  keys.map((key) => {
    const d = data.map((sektor) => {
      const years = Object.keys(sektor)
      years.length = years.length - 1
      const data = years.map((year) => ({
        x: parseFloat(year),
        y: 100 + parseFloat(sektor[year]),
      }))
      return {
        name: sektor.sector,
        data: data,
        yOffset: offsetsSektoren[sektor.sector],
        highlight: config[key].highlight.includes(sektor.sector),
        color: colorsSektoren[sektor.sector],
      }
    })
    config[key].d = d
  })
  return config
}

export const parseDataSzenarien = (data) => {
  const szenarien = data.szenarien

  let parsed = []

  szenarien.map((szenario) => {
    szenario.widget.data = szenario.widget.data
      .sort((a, b) => b.value - a.value)
      .map((d) => {
        d.x = parseFloat((d.value * 100).toFixed(1))
        d.y = 1
        return d
      })
    parsed.push(szenario)
  })

  return parsed
}

export const formatNumber = (format, value) => {
  if (format === 'gram') return `${(value / 1000).toFixed(1)}&thinsp;kg`
  if (format === 'percent') return `${(value * 100).toFixed(1)}&thinsp;%`
}

export const observe = (target) => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        console.log(
          `${entries[0].target.id} INTERSECTING, Visible: ${entries[0].isVisible}`
        )
      }
    },
    {
      threshold: [0.75],
      delay: 100,
      trackVisibility: true,
    }
  )
  return observer.observe(target)
}

export const loadFile = async (filePath, delimiter = ',') => {
  const csv = dsvFormat(delimiter)

  const res = await fetch(filePath)
  const text = await res.text()

  return csv.parse(text)
}

export const nextUntil = function (originalElement, selector, includeLast) {
  const siblings = []
  let nextElement = originalElement.nextSibling
  while (nextElement) {
    if (
      nextElement.nodeType === Node.ELEMENT_NODE &&
      nextElement.matches(selector)
    ) {
      if (includeLast) {
        siblings.push(nextElement)
      }
      break
    }
    siblings.push(nextElement)
    nextElement = nextElement.nextSibling
  }

  return siblings
}

export const fetchJson = async (path) => {
  const res = await fetch(path)
  const json = await res.json()
  return json
}

export const loadJson = async (filePath) => {
  const res = await fetch(filePath)
  return res.json()
}

export const hexToRgbA = (hex) => {
  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return (
      'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
    )
  }
  throw new Error('Bad Hex')
}

export const getDistanceProzent = (travelType, distance, mobility) => {
  const dDict = {
    5: 'd0to5',
    10: 'd5to20',
    25: 'd20to50',
    50: 'd50more',
  }

  // @TODO:
  // - wie gehen wir mit den unterschiedlichen Kategorien um?
  // - foot benötigt eigene Kategorie

  const tDict = {
    ecar: 'car',
    car: 'car',
    car_mf: 'car_plus',
    foot: 'bike',
    bike: 'bike',
    public: 'public',
  }

  const dCurrent = dDict[distance]
  const tCurrent = tDict[travelType]

  const percent = mobility[tCurrent][dCurrent]
  return percent
}

export const createSzenarioText = (
  step,
  travelType,
  distance,
  space,
  prozent
) => {
  // @Sebastian
  // hier kannst du die Texte für die einzelnen Szenarien verfassen.
  // wir können hier einfach HTML reinschreiben um die Textblöcke zu stylen
  const texte = {
    3.1: {
      car_mf: `${prozent}&thinsp;% der Menschen in ${space} reisen täglich eine Strecke von ${distance} km. (${travelType})`,
      ecar: `${prozent}&thinsp;% der Menschen in ${space} reisen täglich eine Strecke von ${distance} km. (${travelType})`,
      car: `${prozent}&thinsp;% der Menschen in ${space} reisen täglich eine Strecke von ${distance} km. (${travelType})`,
      bike: `${prozent}&thinsp;% der Menschen in ${space} reisen täglich eine Strecke von ${distance} km. (${travelType})`,
      foot: `${prozent}&thinsp;% der Menschen in ${space} reisen täglich eine Strecke von ${distance} km. (${travelType})`,
      public: `${prozent}&thinsp;% der Menschen in ${space} reisen täglich eine Strecke von ${distance} km. (${travelType})`,
    },
    3.2: {
      car_mf: `In Deutschland haben Menschen im Durchschnitt einen täglichen CO2-Fußabdruck von ca. 30kg (11t im Jahr). Davon entfallen knapp 20% (6kg) auf Mobilität.`,
      ecar: `In Deutschland haben Menschen im Durchschnitt einen täglichen CO2-Fußabdruck von ca. 30kg (11t im Jahr). Davon entfallen knapp 20% (6kg) auf Mobilität.`,
      car: `In Deutschland haben Menschen im Durchschnitt einen täglichen CO2-Fußabdruck von ca. 30kg (11t im Jahr). Davon entfallen knapp 20% (6kg) auf Mobilität.`,
      bike: `In Deutschland haben Menschen im Durchschnitt einen täglichen CO2-Fußabdruck von ca. 30kg (11t im Jahr). Davon entfallen knapp 20% (6kg) auf Mobilität.`,
      foot: `In Deutschland haben Menschen im Durchschnitt einen täglichen CO2-Fußabdruck von ca. 30kg (11t im Jahr). Davon entfallen knapp 20% (6kg) auf Mobilität.`,
      public: `In Deutschland haben Menschen im Durchschnitt einen täglichen CO2-Fußabdruck von ca. 30kg (11t im Jahr). Davon entfallen knapp 20% (6kg) auf Mobilität.`,
    },
    3.3: {
      ecar: `Mit dem Auto ergibt sich daraus folgender Aktionsradius (6 Tage die Woche, Hin- & Rückweg.)`,
      car_mf: `Mit dem Auto ergibt sich daraus folgender Aktionsradius (6 Tage die Woche, Hin- & Rückweg.)`,
      car: `Mit dem Auto ergibt sich daraus folgender Aktionsradius (6 Tage die Woche, Hin- & Rückweg.)`,
      bike: `Mit dem Auto ergibt sich daraus folgender Aktionsradius (6 Tage die Woche, Hin- & Rückweg.)`,
      foot: `Mit dem Auto ergibt sich daraus folgender Aktionsradius (6 Tage die Woche, Hin- & Rückweg.)`,
      public: `Mit dem Auto ergibt sich daraus folgender Aktionsradius (6 Tage die Woche, Hin- & Rückweg.)`,
    },
    3.4: {
      ecar: `Wenn wir die Klimaziele bis 2050 einhalten wollen, müssen wir unseren individuellen Fußabdruck reduzieren. Hierfür gibt es verschiedene Szenarien, welche zwischen 1t und 2.7t pro Jahr liegen. Für den täglichen Aktionsradius mit dem Auto bedeutet dies einnen drastischen Einschnitt.`,
      car_mf: `Wenn wir die Klimaziele bis 2050 einhalten wollen, müssen wir unseren individuellen Fußabdruck reduzieren. Hierfür gibt es verschiedene Szenarien, welche zwischen 1t und 2.7t pro Jahr liegen. Für den täglichen Aktionsradius mit dem Auto bedeutet dies einnen drastischen Einschnitt.`,
      car: `Wenn wir die Klimaziele bis 2050 einhalten wollen, müssen wir unseren individuellen Fußabdruck reduzieren. Hierfür gibt es verschiedene Szenarien, welche zwischen 1t und 2.7t pro Jahr liegen. Für den täglichen Aktionsradius mit dem Auto bedeutet dies einnen drastischen Einschnitt.`,
      bike: `Wenn wir die Klimaziele bis 2050 einhalten wollen, müssen wir unseren individuellen Fußabdruck reduzieren. Hierfür gibt es verschiedene Szenarien, welche zwischen 1t und 2.7t pro Jahr liegen. Für den täglichen Aktionsradius mit dem Auto bedeutet dies einnen drastischen Einschnitt.`,
      foot: `Wenn wir die Klimaziele bis 2050 einhalten wollen, müssen wir unseren individuellen Fußabdruck reduzieren. Hierfür gibt es verschiedene Szenarien, welche zwischen 1t und 2.7t pro Jahr liegen. Für den täglichen Aktionsradius mit dem Auto bedeutet dies einnen drastischen Einschnitt.`,
      public: `Wenn wir die Klimaziele bis 2050 einhalten wollen, müssen wir unseren individuellen Fußabdruck reduzieren. Hierfür gibt es verschiedene Szenarien, welche zwischen 1t und 2.7t pro Jahr liegen. Für den täglichen Aktionsradius mit dem Auto bedeutet dies einnen drastischen Einschnitt.`,
    },
    3.5: {
      car_mf: `Würde man auf den öffentlichen Nahverkehr wechseln, der weniger CO2 verbraucht, könnte man sich einen größeren Aktionsradius erhalten.`,
      car: `Würde man auf den öffentlichen Nahverkehr wechseln, der weniger CO2 verbraucht, könnte man sich einen größeren Aktionsradius erhalten.`,
      ecar: `Würde man auf den öffentlichen Nahverkehr wechseln, der weniger CO2 verbraucht, könnte man sich einen größeren Aktionsradius erhalten.`,
      bike: `Würde man auf den öffentlichen Nahverkehr wechseln, der weniger CO2 verbraucht, könnte man sich einen größeren Aktionsradius erhalten.`,
      foot: `Würde man auf den öffentlichen Nahverkehr wechseln, der weniger CO2 verbraucht, könnte man sich einen größeren Aktionsradius erhalten.`,
      public: `Würde man auf den öffentlichen Nahverkehr wechseln, der weniger CO2 verbraucht, könnte man sich einen größeren Aktionsradius erhalten.`,
    },
    3.6: {
      car_mf: `Es muss aber auch nicht so drastisch sein. Selbst wenn man an nur zwei Tagen die Woche nicht mit dem Auto und statt dessen z.B. mit dem Rad fährt, kann man sich auch schon viel Mobilität zurück holen.`,
      ecar: `Es muss aber auch nicht so drastisch sein. Selbst wenn man an nur zwei Tagen die Woche nicht mit dem Auto und statt dessen z.B. mit dem Rad fährt, kann man sich auch schon viel Mobilität zurück holen.`,
      car: `Es muss aber auch nicht so drastisch sein. Selbst wenn man an nur zwei Tagen die Woche nicht mit dem Auto und statt dessen z.B. mit dem Rad fährt, kann man sich auch schon viel Mobilität zurück holen.`,
      bike: `Es muss aber auch nicht so drastisch sein. Selbst wenn man an nur zwei Tagen die Woche nicht mit dem Auto und statt dessen z.B. mit dem Rad fährt, kann man sich auch schon viel Mobilität zurück holen.`,
      foot: `Es muss aber auch nicht so drastisch sein. Selbst wenn man an nur zwei Tagen die Woche nicht mit dem Auto und statt dessen z.B. mit dem Rad fährt, kann man sich auch schon viel Mobilität zurück holen.`,
      public: `Es muss aber auch nicht so drastisch sein. Selbst wenn man an nur zwei Tagen die Woche nicht mit dem Auto und statt dessen z.B. mit dem Rad fährt, kann man sich auch schon viel Mobilität zurück holen.`,
    },
  }
  return {
    title: 'Title',
    paragraph: texte[step][travelType],
  }
}
