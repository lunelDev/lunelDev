// README.md Auto‑Update Script (CommonJS)
// -----------------------------------------------------------------------------
// 깔끔하게 정리한 버전입니다. 역할별로 섹션을 나누고, 헬퍼 함수를 분리해
// 가독성과 유지보수성을 높였습니다.
// -----------------------------------------------------------------------------

const { readFileSync, writeFileSync, existsSync } = require("node:fs");
const Parser = require("rss-parser");

// ─────────────────── 설정값 ───────────────────
const BLOG_RSS_URL = "https://j2su0218.tistory.com/rss"; // RSS 피드 주소
const BLOG_POST_LIMIT = 5;                               // 표시할 게시글 수

// ───────── 고정 템플릿: 헤더 + Tech + Portfolio ─────────
const fixedHeader = `
![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=One%20Code%20at%20a%20Time%20%7C%20One%20Step%20Forward&fontSize=35)

<p align="center">
  <a href="https://github.com/BUGISU/JisuPark-Resume">
    <img src="https://img.shields.io/badge/Resume-FF6F61?style=for-the-badge&logo=Micro.blog&logoColor=white" />
  <a href="https://j2su0218.tistory.com">
    <img src="https://img.shields.io/badge/Blog-FF9800?style=for-the-badge&logo=Blogger&logoColor=white" />
  </a>
  <a href="mailto:admin@j2su0218@gmail.com">
    <img src="https://img.shields.io/badge/Email-30B980?style=for-the-badge&logo=Gmail&logoColor=white" />
  </a>
</p>

## 👋 About Me

- 🎮 Unity 기반 XR·AR 학습/게임 콘텐츠 개발 경험  
- 🌐 Spring Boot + React 풀스택 웹 서비스 구현  
- ☁️ Firebase·OpenAI API 등 클라우드 연동 프로젝트 수행  
- ✍️ 블로그와 GitHub에 학습·개발 기록 공유  

## 🧠 Tech Stack & Tools

### 💻 Languages & Frameworks
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white) 
![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=openjdk&logoColor=white) 
![Spring&nbsp;Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) 
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) 
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) 
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) 
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) 
![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)

### 🛠 Tools
![Unity](https://img.shields.io/badge/Unity-000000?style=for-the-badge&logo=unity&logoColor=white) 
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) 
![IntelliJ](https://img.shields.io/badge/IntelliJ-ED2761?style=for-the-badge&logo=intellijidea&logoColor=white) 
![VS&nbsp;Code](https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white) 
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) 
![Adobe&nbsp;Premiere](https://img.shields.io/badge/Premiere%20Pro-9999FF?style=for-the-badge&logo=adobe-premierepro&logoColor=white) 
![Adobe&nbsp;Photoshop](https://img.shields.io/badge/Photoshop-31A8FF?style=for-the-badge&logo=adobe-photoshop&logoColor=white)


## 📂 All Projects at a Glance
총 **16개 프로젝트**를 진행했으며, 아래 표에서 한눈에 확인할 수 있습니다.  
각 프로젝트명을 클릭하면 상세 내용과 기술 스택을 확인하실 수 있습니다.

| Project                                                                                   | Period              | Description                                             |
| ----------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------- |
| [SnapTide](https://github.com/BUGISU/SnapTide) ｜ [API](https://github.com/BUGISU/SnapTideAPI) | 2024.09 ~ 2024.10   | 여행지 이미지 기반 SNS 플랫폼, CSR SPA 구조로 빠른 라우팅 |
| [FilmCritiq](https://github.com/BUGISU/FilmCritiq)                                        | 2024.08 ~ 2024.09   | 영화 리뷰 아카이브 플랫폼, SSR 방식으로 SEO 최적화       |
| [Team_ShakePot](https://github.com/BUGISU/Team_ShakePot)                                  | 2024.10 ~ 2024.11   | 단백질 쉐이크 정보 제공, 사용자-공급자 연결 플랫폼       |
| [보자마자 PLAY (모바일)](https://github.com/BUGISU/BojamajaPlay2_mobile) ｜ [리얼모션](https://github.com/BUGISU/BojamajaPlay2_realmotion) | 2020.11 ~ 2021.08   | Unity 기반 인터랙티브 캐주얼 게임 시리즈                 |
| [런 투더 문](https://github.com/BUGISU/BMF-Run.to.the.Moon)                              | 2021.08 ~ 2022.12   | 운동 습관 형성을 위한 러닝형 피트니스 콘텐츠             |
| [사이클링 투어](https://github.com/BUGISU/BMF-CyclingTour)                                | 2022.08 ~ 2023.01   | 아시아 배경의 사이클링 피트니스 콘텐츠                    |
| [시티투어 부산](https://github.com/BUGISU/BMF-CityTourBusan)                              | 2023.01 ~ 2023.07   | 부산 배경의 사이클링 피트니스 콘텐츠                      |
| [어메이징코어](https://github.com/BUGISU/BMF-AmazingCore)                                | 2022.10 ~ 2023.03   | 코어 근육 단련을 위한 실감형 피트니스 콘텐츠             |
| [보자마자 케어](https://github.com/BUGISU/BMF-BojamajaCare)                              | 2022.06 ~ 2022.12   | 시니어 대상 인지훈련 및 뇌훈련 키오스크 (세로 버전)      |
| [보자마자 브레인](https://github.com/BUGISU/BMF-BojamajaBrain)                           | 2022.06 ~ 2023.03   | 시니어 대상 인지훈련 및 뇌훈련 키오스크 (가로 버전)      |
| **늘봄 시리즈**<br> [영어 주문을 찾아서](https://github.com/BUGISU/MC_NB_English) ｜ [우리들의 색깔 학교](https://github.com/BUGISU/MC_NB_Art) ｜ [지금 몇 시일까요?](https://github.com/BUGISU/MC_NB_Clock) ｜ [자연의 신비 모험](https://github.com/BUGISU/MC_NB_Nature) ｜ [음악 마법 모험](https://github.com/BUGISU/MC_NB_Music) | 2025.03 ~ 2025.05   | 초등 저학년 대상 학습형 Unity 콘텐츠 시리즈 (영어·미술·수학·과학·음악) |
| [물의 상태 변화 관찰하기](https://github.com/BUGISU/MC_NET_10_0102)                      | 2025.07 ~ 2025.07   | 초등 과학 – 물의 상태 변화 관찰 실험형 콘텐츠            |
| [세포의 세계](https://github.com/BUGISU/NMB_09_0201)                                     | 2025.06 ~ 2025.06   | 중등 과학 – 동식물 세포 탐험 및 비교 학습                |
| [PCR 실험 탐구](https://github.com/BUGISU/MC_LHT2_03_PCR)                                | 2025.06 ~ 2025.06   | 고등 생명과학 – PCR 과정 시뮬레이션 학습                |
| [복천박물관](https://github.com/BUGISU/Bokcheon-dong)                                    | 2021.09 ~ 2021.12   | 지역 역사 유물을 3D 전시 콘텐츠로 구현한 AR 앱           |
`;

// ───────────── GitHub Stats 템플릿 ─────────────
const githubStats = `
## 📊 GitHub Stats
<p align="center">
  <img src="https://github-readme-stats-sigma-five.vercel.app/api?username=BUGISU&show_icons=true&theme=default" height="150" />
  <img src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=BUGISU&layout=compact" height="150" />
</p>

`;

// ───────────── RSS → 최신 글 리스트 생성 ─────────────
async function buildBlogSection() {
  const parser = new Parser({
    headers: {
      "User-Agent": "Mozilla/5.0 (GitHubActionsBot)",
      Accept: "application/rss+xml, application/xml, text/xml; q=0.9",
    },
  });

  try {
    const feed = await parser.parseURL(BLOG_RSS_URL);
    if (!feed?.items?.length) return "- (최근 글이 없습니다)";

    return feed.items.slice(0, BLOG_POST_LIMIT)
      .map(({ title, link, pubDate }) => {
        const date = new Date(pubDate ?? Date.now()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        return `- ${date} · [${title}](${link})`;
      })
      .join("\n");
  } catch (error) {
    console.error("RSS 파싱 실패:", error);
    return "- (최근 글을 불러오지 못했습니다)";
  }
}

// ───────────── README 생성 & 저장 ─────────────
function buildReadme(blogSection) {
  return [
    fixedHeader,
    "## ✍️ Latest Blog Posts",
    blogSection,
    githubStats,
  ].join("\n\n");
}

function writeReadme(content) {
  const path = "README.md";
  const oldContent = existsSync(path) ? readFileSync(path, "utf8") : "";

  if (oldContent.trim() === content.trim()) {
    console.log("ℹ️ README 내용 동일 — 커밋 생략");
    return;
  }

  writeFileSync(path, content, "utf8");
  console.log("✅ README.md 업데이트 완료!");
}

// ───────────────────── main ─────────────────────
(async function main() {
  try {
    const blogSection = await buildBlogSection();
    const newReadme = buildReadme(blogSection);
    writeReadme(newReadme);
  } catch (error) {
    console.error("❌ README 업데이트 중 오류:", error);
    process.exit(1);
  }
})();
