# GitHub Secrets를 이용한 Gemini API 키 설정 가이드

## 개요
이 프로젝트는 GitHub Secrets를 통해 보안적으로 Gemini API 키를 관리합니다.

## 1. GitHub Secrets 설정 방법

### Repository Secrets 설정

1. GitHub 저장소로 이동
2. **Settings** → **Secrets and variables** → **Actions** 탭 선택
3. **New repository secret** 클릭
4. 다음 정보 입력:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Secret**: Google Gemini API 키 입력
5. **Add secret** 클릭

### API 키 생성 방법

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials)로 이동
2. 프로젝트 선택 (없으면 새로 생성)
3. **+ CREATE CREDENTIALS** → **API key** 선택
4. 생성된 API 키 복사
5. GitHub Secrets에 붙여넣기

## 2. 로컬 개발 환경 설정

### .env.local 파일 생성

```bash
cp .env.example .env.local
```

### .env.local 수정

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

API 키를 실제 키로 바꾼 후 저장합니다.

> **주의**: `.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 올라가지 않습니다.

## 3. 코드에서 API 키 사용

### 자동 로드

GeminiChat 컴포넌트에서 다음 순서로 API 키를 자동으로 로드합니다:

1. `import.meta.env.VITE_GEMINI_API_KEY` (환경 변수)
2. 사용자 입력 (환경 변수가 없을 경우)

```typescript
const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const hasEnvKey = !!envApiKey;
```

## 4. 빌드 및 배포

### 개발 환경

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

GitHub Actions를 통해 배포 시, 자동으로 `VITE_GEMINI_API_KEY` 시크릿이 빌드 환경에 주입됩니다.

## 5. Vite 환경 변수 설정

Vite는 `VITE_` 접두사가 있는 환경 변수만 클라이언트에 노출합니다.

```typescript
// 노출됨 (클라이언트에서 사용 가능)
import.meta.env.VITE_GEMINI_API_KEY

// 노출되지 않음 (보안)
process.env.API_SECRET
```

## 6. 보안 주의사항

⚠️ **중요**: 다음 사항을 반드시 지켜주세요:

- API 키를 소스 코드에 직접 입력하지 마세요
- `.env.local`을 절대 Git에 커밋하지 마세요
- 실수로 노출된 API 키는 즉시 비활성화하세요
- Production 배포 시에는 항상 GitHub Secrets를 사용하세요

## 7. 문제 해결

### "API 키를 찾을 수 없습니다" 메시지가 나타나는 경우

- `.env.local` 파일을 확인하세요
- `VITE_GEMINI_API_KEY` 환경 변수가 올바르게 설정되었는지 확인하세요
- 개발 서버를 재시작하세요 (`npm run dev`)

### GitHub Actions 배포에서 API 키가 작동하지 않는 경우

- Repository Secrets에서 `VITE_GEMINI_API_KEY`가 올바르게 설정되었는지 확인하세요
- GitHub Actions workflow 파일에서 secrets를 환경 변수로 전달하고 있는지 확인하세요

## 참고 자료

- [Vite 환경 변수 문서](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Secrets 문서](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Google Gemini API 문서](https://ai.google.dev/docs)
