import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

const baseUrl = import.meta.env.BASE_URL

export const ShareButton = () => {
  const kakao = useKakao()
  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={() => {
          if (!kakao) {
            return
          }

          // baseUrl(예: "/wedding-invitation")에는 끝 슬래시가 없어서, 슬래시 없이
          // 링크를 만들면 GitHub Pages가 301 리다이렉트를 내려주는데 카카오톡
          // 앱은 이 리다이렉트를 따라가지 않아 탭해도 반응이 없다.
          const siteUrl = `${window.location.protocol}//${window.location.host}${baseUrl}/`

          kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
              description:
                WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
              imageUrl: `${siteUrl}preview_image.jpg`,
              link: {
                mobileWebUrl: siteUrl,
                webUrl: siteUrl,
              },
            },
            buttons: [
              {
                title: "초대장 보기",
                link: {
                  mobileWebUrl: siteUrl,
                  webUrl: siteUrl,
                },
              },
            ],
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
