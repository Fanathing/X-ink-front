# 🧭 X-Link V1 프로젝트 개발 표준 및 컨벤션

본 문서는 **X-Link V1 프로젝트** 개발 시 준수해야 할 **코딩 스타일, 명명 규칙, 폴더 구조, ESLint/Prettier 설정, 환경 설정, Git 규칙**을 정의합니다.  
프로젝트는 **React + JavaScript** 기반이며, AWS EC2로 배포됩니다.  

---

## 1. 기술 스택

| 영역 | 기술 / 표준 | 설명 |
|------|-------------|------|
| 프론트엔드 | React (JS, JSX) | 함수형 컴포넌트 + Hooks 사용 |
| 스타일링 | styled-components | CSS-in-JS 기반, 클래스 충돌 없음 |
| 상태 관리 | React useState/useReducer | Redux/other state management 없음 |
| 데이터 통신 | Axios / Fetch | REST API 기반 통신 |
| 백엔드 | Node.js + Express | 최소 구조, V1에서는 간단 CRUD |
| 데이터베이스 | MySQL | 관계형 DB, 외래키 제약 적용 |
| 환경 변수 | .env 파일 | AWS 배포 환경 포함 |
| 배포 | AWS EC2 | React 빌드 후 Nginx 또는 Express Static으로 배포 |

---

## 2. 파일 / 폴더 구조
```sh
xlink-v1/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env
└── backend/
    ├── src/
    ├── package.json
    └── .env
```

```sh *아래는 단순 참고만하는 용도 
xlink-v1/
├── public/
│   └── index.html
├── src/
│   ├── api/                  
│   ├── assets/               
│   ├── components/           
│   │   └── buttons/
│   │       └── submitButton.jsx
│   ├── hooks/                
│   ├── pages/                
│   │   ├── home/
│   │   ├── jobDetail/
│   │   └── profile/
│   ├── styles/               
│   ├── utils/                
│   ├── App.jsx
│   ├── index.jsx
│   └── routes.jsx            
├── .env
├── package.json
├── .eslintrc.js
├── .prettierrc
└── .vscode/settings.json
```
2.1 네이밍 규칙

파일/폴더: camelCase (예: submitButton.jsx, jobDetail)

컴포넌트: PascalCase (예: SubmitButton)

변수 / 함수: camelCase

상수: UPPER_SNAKE_CASE

styled-component: PascalCase (예: const CardContainer = styled.div``)

3. JavaScript / React 코딩 컨벤션

세미콜론: 항상 사용 (;)

문자열: " " (큰따옴표)

들여쓰기: 탭

함수 정의: Arrow function 적극 사용

```js
const fetchJobs = async () => { ... }
```

State / Props: camelCase

JSX 속성 값: 큰따옴표 사용

Hooks: use 접두사, 순서: useState → useEffect → 커스텀 훅

비동기 처리: async/await + try/catch

주석: 한국어, 필요 시 jsdoc 간단 표기

4. styled-components 규칙

각 컴포넌트별로 분리 (파일명과 PascalCase 일치)

props 조건부 스타일링 시 template literal 사용

```js
const Button = styled.button`
  background-color: ${props => props.primary ? "blue" : "gray"};
`;
```

전역 스타일(theme) 정의 권장, ThemeProvider 사용 가능

5. ESLint & Prettier 설정
5.1 .eslintrc.js

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", "tab"],
    "no-var": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
```
5.2 .prettierrc
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 1,
  "useTabs": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "printWidth": 100
}
```
5.3 VSCode 설정 (.vscode/settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 1,
  "editor.insertSpaces": false,
  "eslint.validate": ["javascript", "javascriptreact"],
  "prettier.requireConfig": true
}
```
6. Git & Commit 규칙

# 📝 X-Link V1 프로젝트 Git 커밋 메시지 컨벤션

본 문서는 X-Link V1 프로젝트에서 Git 커밋 메시지를 통일하기 위한 규칙을 정의합니다.  
팀 내 협업 시 **커밋 메시지 통일 → 코드 변경 이력 명확화 → 리뷰 효율 향상** 목적입니다.

---

## 1. 커밋 타입

| 타입 | 설명 | 예시 |
|------|------|------|
| **feat** | 새로운 기능 추가 | `feat: add support page` |
| **fix** | 버그 수정 | `fix: correct date display on review card` |
| **docs** | 문서 수정/추가 | `docs: update README with API info` |
| **style** | 코드 포맷, 세미콜론, 들여쓰기 등 스타일 수정 (기능 변화 없음) | `style: format button component with prettier` |
| **refactor** | 코드 구조 변경, 기능 변화 없음 | `refactor: extract helper function for API call` |
| **chore** | 빌드/설정/패키지 업데이트 등, 기능 변화 없음 | `chore: update eslint config` |
| **test** | 테스트 코드 추가/수정 | `test: add unit test for fetchRestaurants` |

---

브랜치 전략: main 보호, feature 브랜치 → PR → merge
브랜치 구성 : main / develop / feature로 운영하고 각 개발자는 feature에서 작업 진행 후 feature로 push

Husky + lint-staged (package.json에 적용해야함.)
```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.js": ["eslint --fix", "prettier --write"]
}
```
7. 환경변수 구조 (.env)
```sh
REACT_APP_API_URL=https://api.xlink.com
REACT_APP_ENV=development
```

배포 시 환경별 파일(.env.production) 생성

8. 폴더별 규칙 / 역할
폴더	역할
src/api	REST API 호출 함수 정의
src/components	재사용 컴포넌트
src/hooks	커스텀 훅
src/pages	라우트 페이지
src/styles	theme, 전역 스타일
src/utils	공용 헬퍼 함수
src/assets	이미지, 로고, 아이콘
src/routes.jsx	라우터 관리
9. 데이터 / DB 연동 규칙 (React 프론트 기준)

API 호출 시 axios instance 활용

에러 처리 시 try/catch + alert

V1에서는 CRUD 최소화, 지원/공고 루프만 구현

상태 관리: useState / useReducer / Context (필요시)

10. V1 핵심 기능 루프
기업 측
회원가입 → 로그인 → 프로필 관리 → 공고 1개 등록 → 지원자 확인

개인 측
회원가입 → 로그인 → 프로필 관리 → 공고 목록 조회 → 지원 → 내 지원 목록 확인


✅ 이 문서와 설정 파일 세트는 그대로 프로젝트에 적용 가능하며, 개발팀은 이 기준을 준수하여 코딩합니다.