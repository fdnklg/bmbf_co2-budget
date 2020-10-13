import mapbox from "mapbox-gl";

console.log(__env__);

mapbox.accessToken = __env__.MAPBOX_ACCESS_TOKEN;

const key = {};

export { mapbox, key };
