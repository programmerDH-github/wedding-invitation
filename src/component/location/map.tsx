/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import { useKakao } from "../store"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import { LOCATION, WEDDING_HALL_POSITION } from "../../const"
import { KAKAO_SDK_JS_KEY } from "../../env"

export const Map = () => {
  return <KakaoMap />
}

const KakaoMap = () => {
  const kakao = useKakao()
  const ref = useRef<HTMLDivElement>(null)
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<number | null>(null)
  const [kakaoMaps, setKakaoMaps] = useState<any>(null)

  useEffect(() => {
    if (!KAKAO_SDK_JS_KEY) return

    const scriptSrc = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_SDK_JS_KEY}&autoload=false`

    if ((window as any).kakao?.maps) {
      setKakaoMaps((window as any).kakao.maps)
      return
    }

    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script")
      script.src = scriptSrc
      script.addEventListener("load", () => {
        if ((window as any).kakao) {
          ;(window as any).kakao.maps.load(() => {
            setKakaoMaps((window as any).kakao.maps)
          })
        }
      })
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (kakaoMaps && ref.current) {
      const center = new kakaoMaps.LatLng(
        WEDDING_HALL_POSITION[1],
        WEDDING_HALL_POSITION[0],
      )
      const map = new kakaoMaps.Map(ref.current, { center, level: 4 })
      new kakaoMaps.Marker({ position: center, map })
    }
  }, [kakaoMaps])

  const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) return "ios"
    if (userAgent.match(/(Android)/)) return "android"
    return "other"
  }

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null)
                clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null)
                clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}
        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            if (lockMessageTimeout.current !== null)
              clearTimeout(lockMessageTimeout.current)
            setShowLockMessage(false)
            setLocked((l) => !l)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>
        <div className="map-inner" ref={ref}></div>
      </div>
      <div className="navigation">
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                if (kakao)
                  kakao.Navi.start({
                    name: LOCATION,
                    x: WEDDING_HALL_POSITION[0],
                    y: WEDDING_HALL_POSITION[1],
                    coordType: "wgs84",
                  })
                break
              default:
                window.open(
                  `https://map.kakao.com/link/map/${LOCATION},${WEDDING_HALL_POSITION[1]},${WEDDING_HALL_POSITION[0]}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          카카오 내비
        </button>
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android": {
                const params = new URLSearchParams({
                  goalx: WEDDING_HALL_POSITION[0].toString(),
                  goaly: WEDDING_HALL_POSITION[1].toString(),
                  goalName: LOCATION,
                })
                window.open(`tmap://route?${params.toString()}`, "_self")
                break
              }
              default:
                alert("모바일에서 확인하실 수 있습니다.")
                break
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵
        </button>
      </div>
    </>
  )
}
