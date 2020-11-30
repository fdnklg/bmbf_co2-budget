export const items = [
{

	coordinates: [135.753847, 34.986406],
	zoom: 10,
	headline: 'Doch alles Gutzureden konnte es nicht überzeugen',
	paragraph: 'Die Copy warnte das Blindtextchen, da, wo sie herkäme wäre sie zigmal umgeschrieben worden und alles, was von ihrem Ursprung noch übrig wäre, sei das Wort „und“ und das Blindtextchen solle umkehren und wieder in sein eigenes, sicheres Land zurückkehren. Doch alles Gutzureden konnte es nicht überzeugen und so dauerte es nicht lange, bis ihm ein paar heimtückische Werbetexter auflauerten, es mit Longe und Parole betrunken machten und es dann in ihre Agentur schleppten, wo sie es für ihre Projekte wieder und wieder missbrauchten. Und wenn es nicht umgeschrieben wurde, dann benutzen Sie es immer noch.'
},
{
	coordinates: [100.753847, 34.986406],
	zoom: 12,
	headline: 'Doch alles Gutzureden konnte es nicht überzeugen',
	paragraph: 'Die Copy warnte das Blindtextchen, da, wo sie herkäme wäre sie zigmal umgeschrieben worden und alles, was von ihrem Ursprung noch übrig wäre, sei das Wort „und“ und das Blindtextchen solle umkehren und wieder in sein eigenes, sicheres Land zurückkehren. Doch alles Gutzureden konnte es nicht überzeugen und so dauerte es nicht lange, bis ihm ein paar heimtückische Werbetexter auflauerten, es mit Longe und Parole betrunken machten und es dann in ihre Agentur schleppten, wo sie es für ihre Projekte wieder und wieder missbrauchten. Und wenn es nicht umgeschrieben wurde, dann benutzen Sie es immer noch.'
},
{
	coordinates: [80.753847, 34.986406],
	zoom: 8,
	headline: 'Doch alles Gutzureden konnte es nicht überzeugen',
	paragraph: 'Die Copy warnte das Blindtextchen, da, wo sie herkäme wäre sie zigmal umgeschrieben worden und alles, was von ihrem Ursprung noch übrig wäre, sei das Wort „und“ und das Blindtextchen solle umkehren und wieder in sein eigenes, sicheres Land zurückkehren. Doch alles Gutzureden konnte es nicht überzeugen und so dauerte es nicht lange, bis ihm ein paar heimtückische Werbetexter auflauerten, es mit Longe und Parole betrunken machten und es dann in ihre Agentur schleppten, wo sie es für ihre Projekte wieder und wieder missbrauchten. Und wenn es nicht umgeschrieben wurde, dann benutzen Sie es immer noch.'
}
];

export const distances = {
    hasIntro: true,
    title: 'Wie weit fährst du täglich?',
    subtitle: 'Markiere deine täglich zurückgelegte Strecke.',
    elements: [
        {
            label: '',
            isHTML: true,
            icon: '<div class="distWrapper"><span class="dist">5</span><span class="metric">km</span></div>',
            value: 5,
        },
        {
            label: '',
            isHTML: true,
            icon: '<div class="distWrapper"><span class="dist">10</span><span class="metric">km</span></div>',
            value: 10,
        },
        {
            label: '',
            isHTML: true,
            icon: '<div class="distWrapper"><span class="dist">25</span><span class="metric">km</span></div>',
            value: 25,
        },
        {
            label: '',
            isHTML: true,
            icon: '<div class="distWrapper"><span class="dist">50</span><span class="metric">km</span></div>',
            value: 50,
        },
    ]
};

export const transportTypes = {
    hasIntro: true,
    title: 'Auf welche Weise bewegst du dich fort?',
    subtitle: 'Wählen Sie einen Mobilitätstyp aus der deinen Gewohnheit sich fortzubewegen deckt.',
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
            label: 'Auto',
            icon: 'car.svg',
            value: 'car',
        },
    ]
};