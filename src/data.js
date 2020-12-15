
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
                        format: 'percent',
						fill: '#3C3372',
                        showLabel: true,
                        showValue: true
					},
					{
						type: 'Zivilluftfahrt',
                        value: .134,
                        format: 'percent',
						fill: '#F2F2F2',
					},
					{
						type: 'Schiffahrt',
                        value: .136,
                        format: 'percent',
						fill: '#F2F2F2',
					},
					{
						type: 'Eisenbahn',
                        value: .005,
                        format: 'percent',
						fill: '#F2F2F2',
					},
					{
						type: 'Andere',
                        value: .005,
                        format: 'percent',
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
                        format: 'percent',
                        value: .72,
                        format: 'percent',
						fill: '#3C3372',
                        showLabel: true,
                        showValue: true
					},
					{
						type: 'Andere',
                        value: .28,
                        format: 'percent',
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
                        format: 'percent',
						fill: '#E2E0EA'
					},
					{
						type: 'Schwerlaster',
                        value: .262,
                        format: 'percent',
						fill: '#928DB0'
					},
					{
						type: 'Leichte Nutzfahrzeuge',
                        value: .119,
                        format: 'percent',
						fill: '#C5C2D5'
					},
					{
						type: 'Autos',
                        value: .607,
                        format: 'percent',
						fill: '#3C3372',
                        showLabel: true,
                        showValue: true
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
                    x: 100
                },
				d: [],
            }
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
                    x: 100
                },
                d: []
            }
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
                    x: 100
                },
                d: []
            }
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
                    x: 100
                },
                d: []
            }
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
                    x: 100
                },
                d: []
            }
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
                    x: 100
                },
                d: []
            }
        },
    },
}