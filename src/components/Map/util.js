import { dsvFormat } from 'd3-dsv';

export const createGeoJson = (path) => {
    const coordPairs = parse(path, ';');

    const coords = coordPairs.map(coordPair => {
        return parse(coordPair, ',').map(c => parseFloat(c));
    });

    const geojson = 
        {
            "type": "Feature",
            "geometry": {   
                "type": "Polygon",
                "coordinates": [coords]
            }
        }


    return geojson; 
}

const parse = (str, delimiter) => {
    const csv = dsvFormat(delimiter);
    const parsed = csv.parse(str);
    return parsed.columns;
}