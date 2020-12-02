
export default {
	emissionen: {
			start: {
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
			transition: {
					meta: {
						title: 'CO2-Emissionen im Straßenverkehr',
						subtitle: 'Aufschlüsselung der Emissionen nach Verkehrsträgern.',
						src: '<a class="source" href="https://www.europarl.europa.eu/">Europäische Umweltagentur</a>'
					},
				annotation: {
					label: 'Anteil Straßenverkehr',
					align: 'right',
					x: 72
				},
				d: [
					{
						type: 'Straßenverkehr',
						value: .72,
						fill: '#3C3372',
						showLabel: true
					},
					{
						type: 'Andere',
						value: .28,
						fill: '#F2F2F2',
						showLabel: false
					},
				],
			},
			end: {
				meta: {
					subset: 72,
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
    },
    sektoren: {
        start: {
            meta: {
                title: 'CO-2 Emissionen nach Sektoren',
                subtitle: 'Hier steht die zweite Überschrift',
                src: '<a class="source" href="https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer">Europäisches Parlament</a>'
            },
            highlight: [],
            annotation: []
        },
        verkehr: {
            meta: {
                title: 'CO-2 Emissionen nach Sektoren',
                subtitle: 'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
                src: '<a class="source" href="https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer">Europäisches Parlament</a>'
            },
            highlight: ['Verkehr'],
            annotation: [
                {
                    label: 'Verkehr',
                    color: 'red',
                    x: 2012,
                    y: 110
                }
            ]
        },
        landwirtschaft: {
            meta: {
                title: 'CO-2 Emissionen nach Sektoren',
                subtitle: 'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
                src: '<a class="source" href="https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer">Europäisches Parlament</a>'
            },
            highlight: ['Land-, Forstwirtschaft, Fischerei'],
            annotation: [
                {
                    label: 'Land-, Forstwirtschaft, Fischerei',
                    color: 'grey',
                    x: 2009,
                    y: 120
                }
            ]
        },
        end: {
            meta: {
                title: 'CO-2 Emissionen nach Sektoren',
                subtitle: 'Die CO2-Emissionen im Verkehr steigen tendenziell eher als dass sie sinken.',
                src: '<a class="source" href="https://www.eea.europa.eu/data-and-maps/data/data-viewers/greenhouse-gases-viewer">Europäisches Parlament</a>'
            },
            highlight: [],
            annotation: [
            ]
        },
    },
    szenarien: {
        start: {
            scenario: "2020",
            zipcode: 41372,
            distance: 50,
            zoom: 7,
            diameter: true
        },
        szenarioEins: {
            scenario: "2020",
            zipcode: 41372,
            distance: 50,
            zoom: 6,
            diameter: true,
            isochrones: ['car']
        },
        szenarioZwei: {
            scenario: "2050_max",
            zipcode: 41372,
            distance: 50,
            zoom: 7,
            diameter: true,
            isochrones: ['car']
        },
        szenarioDrei: {
            scenario: "2050_max",
            zipcode: 41372,
            distance: 50,
            zoom: 7,
            diameter: true,
            isochrones: ['public']
        },
        szenarioDrei: {
            scenario: "2050_max",
            zipcode: 41372,
            distance: 50,
            zoom: 7,
            diameter: true,
            isochrones: ['car', 'public']
        },
        end: {
            scenario: "2050_max",
            zipcode: 41372,
            distance: 50,
            zoom: 7,
            diameter: true,
            isochrones: ['car', 'public']
        },
    }
}

/*
   Wie ist der Flow? 
   - Nutzer gibt Daten ein / wählt default Werte
   - Anzeigen des Kreises und Umkreises auf der Karte
   - Bei Scroll wird das Widget angezeigt
   - Bei Scroll wird das Widget beschrieben (CO2 Verbrauch / Distanz)
   - Bei Scroll werden die Szenarien geladen (Widget zeigt neuen CO2 Verbrauch an)

   Was muss implementiert werden?
   - config objekt für karte (annotationen, x, y, position, hasDiameter)
   - datenaufbereitung für Karte

   - implementierung der logik in der karte

   - die quelle sollte verschiedene layer enthalten

   - wenn diameter === true erstelle 2 points mit radius
   - wenn isochrone array elemente enthält: erstelle eine quelle mit layerm pro element



   - kommunikation mit waypoints
   - widget (in karte)

   wird das config objekt erstellt, sobald eigene angaben gemacht wurden?
   is es sinnvoll ein standard flow zu definieren (für den fall, dass keine Angaben gemacht werden)
*/