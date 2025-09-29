import React from "react"
import "./ExpandablePhotoShowcase.css"

const PANELS = [
  {
    image: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/4_vdq81a.jpg",
    alt: "Renovated London townhouse living room",
    location: "London",
    meta: "SW1 - Completed September 2025"
  },
  {
    image: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/6_rrjhnu.jpg",
    alt: "Modern kitchen in a Manchester semi-detached home",
    location: "Manchester",
    meta: "M20 - Completed September 2025"
  },
  {
    image: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754044703/IMG_9055_oxVtei_mrr8o6.jpg",
    alt: "Light filled hallway of a Birmingham home",
    location: "North East",
    meta: "B15 - Completed August 2025"
  },
  {
    image: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754043487/499a_Ckrv5c_e7tfnr.jpg",
    alt: "Converted barn exterior in the Cotswolds",
    location: "Mansfield",
    meta: "NG18 - Completed August 2025"
  }
]

export default function ExpandablePhotoShowcase() {
  return (
    <div className="expandable-photo-showcase" role="list" aria-label="Recent properties we've purchased">
      {PANELS.map(({ image, alt, location, meta }, index) => {
        const labelId = `property-panel-${index}`

        return (
          <article
            key={location}
            className="expandable-photo-panel"
            role="listitem"
            tabIndex={0}
            aria-labelledby={labelId}
          >
            <img className="expandable-photo-image" src={image} alt={alt} loading="lazy" />
            <div className="expandable-photo-overlay">
              <h3 id={labelId} className="expandable-photo-title">
                {location}
              </h3>
              <p className="expandable-photo-meta">{meta}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
