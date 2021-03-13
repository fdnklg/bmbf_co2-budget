export const isLocal = false

export const d0to5 = 5
export const d5to20 = 10
export const d20to50 = 25
export const d50more = 50

export const extent = {
  today: [0, 11000],
  future_min: [0, 2700],
  future_max: [0, 1000],
}

export let stepScenario = '4.0'

export const steps = {
  start: 'start',
  emissionen: '1.0',
  sektoren: '2.0',
  szenarien: '3.0',
  flughaefen: '4.0',
  appendix: 'appendix',
}

export const co2PerKm = {
  plane: 380,
  car: 130,
  ecar: 90,
  car_mf: 45,
  public: 25,
}

export const appendix = {
  sources: [
    [
      'https://www.umweltbundesamt.de/themen/klima-energie/klimaschutz-energiepolitik-in-deutschland/treibhausgas-emissionen/die-treibhausgase',
      'Die Treibhausgase, UBA',
    ],
    [
      'https://mobilitaet-in-tabellen.dlr.de',
      'Regionale Mobilitätsprofile aus "Mobilität in Tabellen", DLR',
    ],
    ['https://uba.co2-rechner.de/de_DE/', 'CO₂ Rechner, UBA'],
    [
      'https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer',
      'Daten zu Treibhausgasemissionen, EEA',
    ],
    [
      'https://www.umweltbundesamt.de/bild/vergleich-der-durchschnittlichen-emissionen-0',
      'Emissionen nach Verkehrsmittel, UBA',
    ],
    [
      'https://www.umweltbundesamt.de/sites/default/files/medien/1410/publikationen/2020-06-15_texte_38-2020_wirkung-tempolimit_bf.pdf',
      'Klimaschutz durch Tempolimit, UBA',
    ],
    [
      'https://www.bahn.de/wmedia/view/mdb/media/intern/umc-grundlagenbericht.pdf',
      'Grundlagenbericht zum UmweltMobilCheck, DB',
    ],
    ['https://www.openstreetmap.org', 'Daten: OpenStreetMap'],
  ],
  method:
    'Ziel des Forschungsvorhaben war es Mittels Prototypen auf Benutzer*innen zugeschnittene datengestützte Storytelling-Ansätze aufzuzeigen. Durch die Personalisierung sollen besonders für sonst abstrakte Themen direkte Bezüge zur Lebenswelt der Leser*innen aufgezeigt werden.<br /><br />Um die persönlichen Bewegungsprofile zu erstellen, haben wir das Routing-System <a href="https://github.com/valhalla/valhalla">Valhalla</a> so modifiziert, dass statt der sonst üblichen Einheit Zeit, die Einheit CO₂ zur Berechnung von Routen und Distanzen genutzt wurde. Als Basis für die Berechnungen dienten Studien und Daten des <a href="https://www.umweltbundesamt.de">Umweltbundesamtes (UBA)</a> und der <a href="https://www.eea.europa.eu">Europäischen Umweltagentur (EEA)</a>.<br /><br />Die hier gelisteten Zahlen entsprechen Durchschnittswerten, genaue Personalisierungen sind ohne das Erfassen von vielen Faktoren nicht möglich. Nichtsdestotrotz haben wir versucht das Modell so genau wie möglich zu machen (z.B. Einbezug von Prognosen zur Leistungssteigerung von Fahrzeugen bei Zukunftsszenarien). Ebenso haben wir bei den Projektionen zwei Varianten gewählt, um die Bandbreite möglicher Szenarien aufzuzeigen.',
}

export const content = {
  projectTitle: 'Wie weit komme ich mit meinem CO₂-Budget?',
}

export const legendText = {
  future:
    'Prognostizierte CO₂ Emissionen in kg für deine Reisedistanz zur Einhaltung der Klimaziele 2050',
  today: 'CO₂ Emissionen in kg für deine Reisedistanz und Reisetyp',
}

export const colors = {
  car: {
    main: '#E79D67',
    light: '#EFC09D',
  },
  ecar: {
    main: '#E9CD68',
    light: '#F1DF9D',
  },
  car_mf: {
    main: '#85C2A5',
    light: '#B1D8C5',
  },
  public: {
    main: '#87AAAB',
    light: '#B4CACB',
  },
  bike: {
    main: '#404455',
    light: '#AAADB8',
  },
  plane: {
    main: '#E77667',
    light: '#EFA79D',
  },
  neutral: {
    main: '#f8f8f8',
    light: '#f2f2f2',
  },
}

export const co2Colors = [
  {
    label: 'keine',
    main: '#404354',
    today: '#555B71',
    future_max: '#888DA5',
    future_min: '#A8ACBD',
  },
  {
    label: 'wenig',
    main: '#507172',
    today: '#699596',
    future_max: '#A5BFC0',
    future_min: '#C3D5D5',
  },
  {
    label: 'mittel',
    main: '#448868',
    today: '#63B18C',
    future_max: '#92C9AE',
    future_min: '#BBDDCD',
  },
  {
    label: 'hoch',
    main: '#C09C1B',
    today: '#DBB11F',
    future_max: '#E9CD68',
    future_min: '#EFDA90',
  },
  {
    label: 'sehr hoch',
    main: '#B05B1C',
    today: '#E0813B',
    future_max: '#E79D67',
    future_min: '#EEB891',
  },
]

export const colorsSektoren = {
  Verkehr: colors.plane,
  Abfall: colors.public,
  Industrie: colors.car_mf,
  Landwirtschaft: colors.bike,
  Energie: colors.ecar,
}

export const offsetsSektoren = {
  Verkehr: 8,
  Abfall: 5,
  Energie: 6,
  Landwirtschaft: 10,
  Industrie: 2,
}
