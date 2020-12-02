import { dsvFormat } from 'd3-dsv';

export const createFeature = (path) => {
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

export const createCircle = (center, radiusInKm, points) => {
    if(!points) points = 64;

    const coords = {
        latitude: center[1],
        longitude: center[0]
    };

    const km = radiusInKm;

    const ret = [];
    const distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    const distanceY = km/110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
        theta = (i/points)*(2*Math.PI);
        x = distanceX*Math.cos(theta);
        y = distanceY*Math.sin(theta);

        ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);

    return {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [ret]
        }
    };
};

export const createGeojson = () => {
    return {
        "type": "FeatureCollection",
        "features": []
    }
}

const parse = (str, delimiter) => {
    const csv = dsvFormat(delimiter);
    const parsed = csv.parse(str);
    return parsed.columns;
}