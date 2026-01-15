import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import GeometricHero from './components/GeometricHero';
import RealEstateAuctionAnalysis from './components/RealEstateAuctionAnalysis';
import { 
  APP_NAME, 
  CONTACT_EMAIL, 
  FRAMEWORK_ITEMS, 
  RESEARCH_ITEMS, 
  SERVICE_ITEMS 
} from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black" id="intro">
        <GeometricHero />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div className="mb-4 text-sm md:text-base font-medium text-zinc-500 uppercase tracking-[0.2em] animate-fade-in-up">
                공간, 기술, 인간
            </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight mb-8">
            다차원 공간 이해 문
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light italic font-serif mb-12">
            Gateway to Dimensions
          </p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto border-t border-white/10 pt-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">미션</h3>
              <p className="text-zinc-300 leading-relaxed">
                점-선-면-차원으로 구성된 일상 공간 속에서 인간의 행위, 관계, 의미를 탐구하고, IT를 인간 중심의 삶의 질 향상 도구로 재해석
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">비전</h3>
              <p className="text-zinc-300 leading-relaxed">
                기술이 보이지 않고, 인간다움이 선명해지는 공간 문화 창조
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Framework Section */}
      <Section id="framework">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">점-선-면-차원 인문학적 프레임워크</h2>
          <div className="w-16 h-1 bg-white mx-auto opacity-20"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FRAMEWORK_ITEMS.map((item) => (
            <div key={item.id} className="group p-8 border border-white/5 rounded-2xl hover:bg-zinc-900 transition-all duration-500 hover:-translate-y-1 bg-black">
              <div className={`mb-6 p-4 rounded-full bg-zinc-900 w-fit group-hover:bg-zinc-800 transition-colors`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2 text-zinc-100">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-zinc-500 mb-4">{item.subtitle}</p>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <button className="inline-flex items-center text-zinc-300 font-medium hover:text-white hover:underline underline-offset-4 transition-colors">
                연구 영역 상세 보기 <ArrowRight className="ml-2 w-4 h-4" />
            </button>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" dark className="border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">주요 서비스</h2>
          <p className="text-zinc-400">연구소에서 제공하는 핵심 IT 플랫폼</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SERVICE_ITEMS.map((service) => (
            <div key={service.id} className="bg-black p-10 rounded-3xl border border-white/5 hover:border-zinc-700 transition-colors">
              <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-zinc-400 mb-8 min-h-[3rem]">{service.description}</p>
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-full text-sm font-medium text-white hover:bg-white hover:text-black transition-all">
                {service.linkText} <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
        
         <div className="mt-12 text-center">
            <button className="inline-flex items-center text-zinc-500 font-medium hover:text-white transition-colors">
                모든 서비스 보기
            </button>
        </div>
      </Section>

      {/* Research Areas */}
      <Section id="research">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">4대 핵심 연구 영역</h2>
          <div className="w-16 h-1 bg-white mx-auto opacity-20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {RESEARCH_ITEMS.map((item) => (
            <div key={item.id} className="text-center p-6">
              <div className="mx-auto mb-6 p-4 rounded-full bg-zinc-900 w-20 h-20 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Real Estate Auction Analysis Section */}
      <Section id="auction" dark className="border-t border-white/5">
        <RealEstateAuctionAnalysis />
      </Section>

      {/* Contact Section */}
      <Section id="contact" dark className="border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">함께 연구하기</h2>
          <p className="text-xl text-zinc-400 mb-10">
            궁금한 점이나 연구 협력 제안이 있으신가요?
          </p>
          
          <div className="inline-flex items-center gap-2 text-2xl md:text-3xl font-bold text-white hover:text-zinc-300 transition-colors cursor-pointer border-b-2 border-transparent hover:border-zinc-300 pb-1">
             <Mail className="w-6 h-6 md:w-8 md:h-8" />
             <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-bold text-white mb-2">{APP_NAME}</h4>
              <p className="text-sm text-zinc-500">다차원 공간 이해 문</p>
            </div>
            
            <div className="text-left md:text-right">
              <p className="text-sm text-zinc-500 mb-1">Email: {CONTACT_EMAIL}</p>
              <p className="text-xs text-zinc-600">© 2026 {APP_NAME}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;