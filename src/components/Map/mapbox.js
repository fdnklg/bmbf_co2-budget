import mapbox from "mapbox-gl";

mapbox.accessToken = __env__.isProd
  ? $MAPBOX_TOKEN
  : __env__.MAPBOX_ACCESS_TOKEN;

const key = {};

export { mapbox, key };
