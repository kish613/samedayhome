import React, { useEffect, useMemo, useState } from "react"
import "./ScrollCarousel.css"

const GRID_ROWS = 3
const GRID_COLS = 5
const FLIP_DURATION_SECONDS = 10
const AUTO_CYCLE_SECONDS = 12
const FADE_DURATION_SECONDS = 1.5

const COMPOSITE_IMAGES = [
  "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/4_vdq81a.jpg",
  "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056354/6_rrjhnu.jpg",
  "https://res.cloudinary.com/dmns9ystn/image/upload/v1754044703/IMG_9055_oxVtei_mrr8o6.jpg",
  "https://res.cloudinary.com/dmns9ystn/image/upload/v1754043487/499a_Ckrv5c_e7tfnr.jpg",
  "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972564/16_berryfield_2_sJHUDn_ii39ya.jpg"
]

const tileDelays = [
  0,
  0.07,
  0.15,
  0.22,
  0.3,
  0.37,
  0.45,
  0.54,
  0.63,
  0.72,
  0.82,
  0.92,
  1.02,
  1.13,
  1.24
]

const tileDirections = [
  "flip-right",
  "flip-left",
  "flip-right",
  "flip-left",
  "flip-right",
  "flip-left",
  "flip-right",
  "flip-right",
  "flip-left",
  "flip-right",
  "flip-left",
  "flip-right",
  "flip-right",
  "flip-left",
  "flip-right"
]

const tiles = Array.from({ length: GRID_ROWS * GRID_COLS }, (_, index) => {
  const row = Math.floor(index / GRID_COLS)
  const col = index % GRID_COLS
  const xPercent = GRID_COLS === 1 ? 50 : (col / (GRID_COLS - 1)) * 100
  const yPercent = GRID_ROWS === 1 ? 50 : (row / (GRID_ROWS - 1)) * 100

  return {
    index,
    row,
    col,
    xPercent,
    yPercent,
    delay: tileDelays[index % tileDelays.length] ?? 0,
    direction: tileDirections[index % tileDirections.length] ?? "flip-right"
  }
})

function GridLayer({ frontImage, backImage, layerState }) {
  const backgroundSizeX = `${GRID_COLS * 100}%`
  const backgroundSizeY = `${GRID_ROWS * 100}%`
  const resolvedBackImage = backImage ?? frontImage

  return (
    <div className={`liquid-grid-layer liquid-grid-container ${layerState}`}>
      {tiles.map(({ index, xPercent, yPercent, delay, direction }) => {
        const cssVars = {
          '--tile-bg-image-front': `url(${frontImage})`,
          '--tile-bg-image-back': `url(${resolvedBackImage})`,
          '--tile-bg-x': `${xPercent}%`,
          '--tile-bg-y': `${yPercent}%`,
          '--tile-bg-size-x': backgroundSizeX,
          '--tile-bg-size-y': backgroundSizeY,
          '--flip-delay': `${delay}s`,
          '--flip-duration': `${FLIP_DURATION_SECONDS}s`
        }

        return (
          <div
            className="liquid-grid-item"
            key={`${layerState}-${index}`}
            role="listitem"
            aria-label="Composite property highlight tile"
          >
            <div className={`liquid-card ${direction}`} style={cssVars}>
              <div className="liquid-card-inner">
                <div className="liquid-card-face liquid-card-front" aria-hidden="true">
                  <div className="liquid-card-overlay" />
                </div>
                <div className="liquid-card-face liquid-card-back" aria-hidden="true">
                  <div className="liquid-card-overlay" />
                </div>
              </div>
              <div className="liquid-card-edge-glow" aria-hidden="true" />
            </div>
          </div>
        )
      })}
    </div>
  )
}


export default function ScrollCarousel() {
  const [activeCompositeIndex, setActiveCompositeIndex] = useState(0)
  const [previousCompositeIndex, setPreviousCompositeIndex] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousCompositeIndex(activeCompositeIndex)
      setActiveCompositeIndex((prev) => (prev + 1) % COMPOSITE_IMAGES.length)
    }, AUTO_CYCLE_SECONDS * 1000)

    return () => clearInterval(interval)
  }, [activeCompositeIndex])

  useEffect(() => {
    if (previousCompositeIndex === null) return

    const timeout = setTimeout(() => {
      setPreviousCompositeIndex(null)
    }, FADE_DURATION_SECONDS * 1000)

    return () => clearTimeout(timeout)
  }, [previousCompositeIndex])

  const activeComposite = useMemo(
    () => COMPOSITE_IMAGES[activeCompositeIndex],
    [activeCompositeIndex]
  )

  const previousComposite = useMemo(
    () => (previousCompositeIndex !== null ? COMPOSITE_IMAGES[previousCompositeIndex] : null),
    [previousCompositeIndex]
  )

  const nextComposite = useMemo(
    () => COMPOSITE_IMAGES[(activeCompositeIndex + 1) % COMPOSITE_IMAGES.length],
    [activeCompositeIndex]
  )

  return (
    <div className="liquid-grid-wrapper">
      <div className="liquid-grid-layer-stack" role="list" aria-live="polite">
        {previousComposite && (
          <GridLayer
            frontImage={previousComposite}
            backImage={activeComposite}
            layerState="fade-out"
          />
        )}
        <GridLayer
          frontImage={activeComposite}
          backImage={nextComposite}
          layerState={previousComposite ? 'fade-in' : 'active'}
        />
      </div>
    </div>
  )
}
