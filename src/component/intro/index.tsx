import { useEffect, useState } from "react"

const FOOTPRINTS = [
  { x: "10%", y: "89%", rot: -12, flip: false, delay: "1.6s" },
  { x: "20%", y: "84%", rot: 10, flip: true, delay: "1.85s" },
  { x: "30%", y: "90%", rot: -14, flip: false, delay: "2.1s" },
  { x: "40%", y: "85%", rot: 9, flip: true, delay: "2.35s" },
  { x: "50%", y: "90%", rot: -10, flip: false, delay: "2.6s" },
  { x: "60%", y: "85%", rot: 12, flip: true, delay: "2.85s" },
  { x: "70%", y: "90%", rot: -9, flip: false, delay: "3.1s" },
  { x: "80%", y: "85%", rot: 11, flip: true, delay: "3.35s" },
]

type Stage = "closed" | "opening" | "closing"

export const Intro = () => {
  const [show, setShow] = useState(true)
  const [stage, setStage] = useState<Stage>("closed")

  useEffect(() => {
    if (!show) return
    document.body.classList.add("intro-open")
    return () => {
      document.body.classList.remove("intro-open")
    }
  }, [show])

  useEffect(() => {
    if (stage !== "opening") return
    const timer = setTimeout(() => setStage("closing"), 4000)
    return () => clearTimeout(timer)
  }, [stage])

  useEffect(() => {
    if (stage !== "closing") return
    const timer = setTimeout(() => setShow(false), 900)
    return () => clearTimeout(timer)
  }, [stage])

  if (!show) return null

  const handleTap = () => {
    if (stage === "closed") setStage("opening")
  }

  return (
    <div
      className={"intro-overlay" + (stage === "closing" ? " closing" : "")}
      onClick={handleTap}
    >
      <div className={"map-sheet" + (stage !== "closed" ? " opened" : "")}>
        <div className="fold-lines" />

        <div className="ink-bloom">
          <span className="blot b1" />
          <span className="blot b2" />
          <span className="blot b3" />
        </div>

        <div className="footprints">
          {FOOTPRINTS.map((fp, i) => (
            <span
              key={i}
              className={"footprint" + (fp.flip ? " flip" : "")}
              style={
                {
                  left: fp.x,
                  top: fp.y,
                  "--rot": `${fp.rot}deg`,
                } as React.CSSProperties
              }
            >
              <span className="mark" style={{ animationDelay: fp.delay }}>
                <span className="pad" />
                <span className="toes" />
              </span>
            </span>
          ))}
        </div>

        <div className="intro-content">
          <div className="spell">
            Amor Vincit Omnia
            <div className="spell-gloss">사랑은 모든 것을 이깁니다</div>
          </div>
        </div>

        <div className="pre-hint">탭하여 열기</div>
      </div>
    </div>
  )
}
