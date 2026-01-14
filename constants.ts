import { 
    Circle, 
    Minus, 
    Square, 
    Box, 
    Compass, 
    Cpu, 
    Heart, 
    Users 
  } from 'lucide-react';
  import { FrameworkItem, NavItem, ResearchItem, ServiceItem } from './types';
  
  export const APP_NAME = "점·선·면 연구소";
  export const CONTACT_EMAIL = "mahau.master@gmail.com";
  
  export const NAV_ITEMS: NavItem[] = [
    { label: "연구소 소개", href: "#intro" },
    { label: "프레임워크", href: "#framework" },
    { label: "주요 서비스", href: "#services" },
    { label: "연구 영역", href: "#research" },
    { label: "연락처", href: "#contact" },
  ];
  
  export const FRAMEWORK_ITEMS: FrameworkItem[] = [
    {
      id: "point",
      icon: Circle,
      color: "text-red-500",
      title: "점 (Point)",
      subtitle: "순간과 존재",
      description: "일상의 작은 순간들에서 의미를 발견하고, 신체 경험과 현상학적 접근을 통해 공간 속 존재의 의미를 탐구합니다."
    },
    {
      id: "line",
      icon: Minus,
      color: "text-blue-500",
      title: "선 (Line)",
      subtitle: "흐름과 관계",
      description: "동선과 일상의 내러티브, 관계의 역학을 통해 움직임 속에 드러나는 삶의 이야기를 분석합니다."
    },
    {
      id: "plane",
      icon: Square,
      color: "text-zinc-300",
      title: "면 (Plane)",
      subtitle: "장소와 공동체",
      description: "공간의 문화적 의미와 장소성을 탐구하며, 공유 공간이 만드는 공동체의 의미를 해석합니다."
    },
    {
      id: "dimension",
      icon: Box,
      color: "text-purple-500",
      title: "차원 (Dimension)",
      subtitle: "시간과 의미",
      description: "과거-현재-미래의 중첩 속에서 기술과 좋은 삶의 관계, 윤리적 문제를 탐구합니다."
    }
  ];
  
  export const SERVICE_ITEMS: ServiceItem[] = [
    {
      id: "codeindocker",
      title: "CodeInDocker",
      description: "개발 구성원 간 보다 쉽고 정확하게 소스 공유하게 돕는 플랫폼",
      linkText: "서비스 방문하기"
    },
    {
      id: "lectureplans",
      title: "LecturePlans",
      description: "AI와 협업을 통해 신속하고 풍부한 강의 자료 준비하게 돕는 플랫폼",
      linkText: "서비스 방문하기"
    }
  ];
  
  export const RESEARCH_ITEMS: ResearchItem[] = [
    {
      id: "space-humanities",
      icon: Compass,
      title: "공간 인문학",
      description: "점-선-면-차원으로 읽는 일상 공간의 문화사"
    },
    {
      id: "tech-philosophy",
      icon: Cpu,
      title: "기술 철학",
      description: "IT는 일상을 어떻게 변화시키는가?"
    },
    {
      id: "digital-wellbeing",
      icon: Heart,
      title: "디지털 웰빙",
      description: "기술과 함께 건강하게 살기"
    },
    {
      id: "inclusive-tech",
      icon: Users,
      title: "포용적 기술",
      description: "모두를 위한 기술, 누구도 소외되지 않는 공간"
    }
  ];