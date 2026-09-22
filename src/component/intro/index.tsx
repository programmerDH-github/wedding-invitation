import { useEffect, useState } from "react"

export const Intro = () => {
  const [show, setShow] = useState(true)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    document.body.classList.add("intro-open")
    return () => {
      document.body.classList.remove("intro-open")
    }
  }, [])

  if (!show) return null

  const handleOpen = () => {
    if (closing) return
    setClosing(true)
    setTimeout(() => setShow(false), 900)
  }

  return (
    <div
      className={"intro-overlay" + (closing ? " closing" : "")}
      onClick={handleOpen}
    >
      <div className="intro-content">
        <div className="spell">
          I solemnly swear
          <br />
          that I am up to no good
        </div>
        <div className="hint">탭하여 청첩장 열기</div>
      </div>
    </div>
  )
}
