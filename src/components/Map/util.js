import { dsvFormat } from 'd3-dsv';
import * as turf from '@turf/turf';

export const createFeature = (path, style) => {
    const coordPairs = parse(path, ';');

    const coords = coordPairs.map(coordPair => {
        return parse(coordPair, ',').map(c => parseFloat(c));
    });

    const geojson = 
        {
            "type": "Feature",
            "properties": style,
            "geometry": {   
                "type": "Polygon",
                "coordinates": [coords]
        },
        }


    return geojson; 
}

export const createBoundingBox = (cutOutFeat) => {
    let united = false;
    if (cutOutFeat && cutOutFeat.length > 1) {
        cutOutFeat = cutOutFeat.map(feat => {
            // var options = { tolerance: 0.001, highQuality: false, mutate: true };
            // feat = turf.simplify(feat, options);
            
            var kinks = turf.kinks(feat);

            if (kinks.features.length) {
                const polys = turf.unkinkPolygon(feat);
                return polys.features[0];
            }

            return feat;
        })
        united = turf.union(...cutOutFeat)
    }

    let bboxEurope = [[[-5.2288281645, 42.0255985816], [25.622332041, 42.0255985816], [25.622332041, 58.9956007543], [-5.2288281645, 58.9956007543], [-5.2288281645, 42.0255985816]]]; 
    
    if (united) {
        bboxEurope = turf.difference(turf.polygon(bboxEurope), united);
    }


    return {
        "type": "Feature",
        "properties": {
            'fill': '#fff',
            'fill-opacity': .75,
            'stroke-opacity': 0
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": united ? bboxEurope.geometry.coordinates : [],
        },
    };
}

export const createCircle = (center, radiusInKm, style) => {
    const points = 64;

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
        "properties": style,
        "geometry": {
            "type": "Polygon",
            "coordinates": [ret],
        },
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