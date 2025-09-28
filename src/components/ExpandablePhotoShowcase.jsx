import React from "react"
import "./ExpandablePhotoShowcase.css"

const PANELS = [
  {
    image: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/4_vdq81a.jpg",
    alt: "Renovated London townhouse living room",
    title: "Prime London Townhouse",
    description: "Vendors completed in seven days with a full cash offer",
    meta: "SW1 • Completed April 2024"
  },
  {
    image: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/6_rrjhnu.jpg",
    alt: "Modern kitchen in a Manchester semi-detached home",
    title: "Manchester Semi-Detached",
    description: "Agreed 94% of asking price after survey in 48 hours",
    meta: "M20 • Completed March 2024"
  },
  {
    image: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754044703/IMG_9055_oxVtei_mrr8o6.jpg",
    alt: "Light filled hallway of a Birmingham home",
    title: "Birmingham Freehold",
    description: "Chain-free sale that released equity for the next move",
    meta: "B15 • Completed February 2024"
  },
  {
    image: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754043487/499a_Ckrv5c_e7tfnr.jpg",
    alt: "Converted barn exterior in the Cotswolds",
    title: "Cotswolds Conversion",
    description: "Rural property purchased with tenants in situ",
    meta: "GL54 • Completed January 2024"
  }
]

export default function ExpandablePhotoShowcase() {
  return (
    <div className="expandable-photo-showcase" role="list" aria-label="Recent properties we've purchased">
      {PANELS.map(({ image, alt, title, description, meta }, index) => {
        const labelId = `property-panel-${index}`

        return (
          <article
            key={title}
            className="expandable-photo-panel"
            role="listitem"
            tabIndex={0}
            aria-labelledby={labelId}
          >
            <img className="expandable-photo-image" src={image} alt={alt} loading="lazy" />
            <div className="expandable-photo-overlay">
              <h3 id={labelId} className="expandable-photo-title">
                {title}
              </h3>
              <p className="expandable-photo-description">{description}</p>
              <p className="expandable-photo-meta">{meta}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
