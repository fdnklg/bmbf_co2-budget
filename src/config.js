import { isLocal } from 'stores';

export const s3Url = "https://locobss-story-co2.s3.eu-central-1.amazonaws.com/";

export const isoChronesUrl = isLocal ? `data/` : s3Url;

export const zipcodesUrl = `${s3Url}postcodes.txt`; 