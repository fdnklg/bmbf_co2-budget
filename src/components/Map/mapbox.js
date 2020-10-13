import mapbox from "mapbox-gl";

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = __env__.MAPBOX_ACCESS_TOKEN;

const key = {};

export { mapbox, key };
