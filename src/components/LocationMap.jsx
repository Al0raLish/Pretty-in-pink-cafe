import { CAFE } from '../data/cafeInfo.js';

// The address is always shown as text too, so the page still works if the map can't load.
export default function LocationMap() {
  return (
    <figure className="map">
      <iframe
        title={`Map showing the location of ${CAFE.name} in F-7 Markaz, Islamabad`}
        src={CAFE.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <figcaption>
        {CAFE.address.join(', ')}.{' '}
        <a href={CAFE.mapLinkUrl} target="_blank" rel="noopener noreferrer">
          Open a larger map<span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}