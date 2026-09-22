# 이동훈 ❤️ 강유화 청첩장

2026년 11월 14일 토요일, 보라매 플로렌스 카라홀에서 올리는 저희 결혼식 모바일 청첩장입니다.

🔗 https://programmerdh-github.github.io/wedding-invitation/

## 기술 스택

React + TypeScript + Vite로 제작했으며, `main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드해 GitHub Pages에 배포합니다.

## 로컬 개발

```bash
npm install
cp .env.example .env   # 카카오 SDK 키 등 입력
npm run dev
```

## 배포에 필요한 값

배포에 필요한 API 키와 환경변수는 저장소 Settings > Secrets and variables > Actions에 등록되어 있습니다.

- Secrets: `VITE_KAKAO_SDK_JS_KEY`
- Variables: `VITE_SERVER_URL`, `VITE_STATIC_ONLY`

## 원본 템플릿

[juhonamnam/wedding-invitation](https://github.com/juhonamnam/wedding-invitation) 템플릿을 기반으로 제작했습니다 (MIT License).
