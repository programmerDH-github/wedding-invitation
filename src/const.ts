import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-11-14 11:30", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

// 예식 당월 휴무일. 켈린더에 표시하기 위함.
// 예: 예식일 8월 -> 8월 15일 광복절
export const HOLIDAYS = [15]

export const LOCATION = "보라매 플로렌스 카라홀"
export const LOCATION_ADDRESS = "서울 동작구 보라매로5길 15 전문건설회관 29층"

// 네이버 지도 및 카카오 네비게이션에 사용할 좌표. [경도, 위도] 형식.
export const WEDDING_HALL_POSITION = [126.924271334879, 37.4921758625358]

// 네이버 지도의 웨딩홀 장소 ID
// 네이버 지도 웹페이지에서 웨딩홀 검색 후 URL에서 확인 가능.
// 예: https://map.naver.com/p/entry/place/13321741 -> 13321741
export const NMAP_PLACE_ID = 34882590

// 카카오 지도의 웨딩홀 장소 ID
// 카카오 지도 웹페이지에서 웨딩홀 검색 후 해당 장소에서 상세보기 클릭 시 URL에서 확인 가능.
// 예: https://place.map.kakao.com/8634826 -> 8634826
export const KMAP_PLACE_ID = 86427304

export const BRIDE_FULLNAME = "강유화"
export const BRIDE_FIRSTNAME = "유화"
export const BRIDE_TITLE = "딸"
export const BRIDE_FATHER = "강성민"
export const BRIDE_MOTHER = "고명자"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-6709-4479",
    account: "하나은행 86691007951307",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-9894-4479",
    account: "농협은행 3520865731613",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-8791-4479",
    account: "농협은행 3560115041213",
  },
]

export const GROOM_FULLNAME = "이동훈"
export const GROOM_FIRSTNAME = "동훈"
export const GROOM_TITLE = "아들"
export const GROOM_FATHER = "이명"
export const GROOM_MOTHER = "박미경"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-9986-8443",
    account: "기업은행 13313504502016",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-5292-8443",
    account: "농협은행 06402318828",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-3131-4325",
    account: "하나은행 20491035453607",
  },
]
