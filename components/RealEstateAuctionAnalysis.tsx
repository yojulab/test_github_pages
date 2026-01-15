import React, { useState } from 'react';
import { Upload, FileText, Clock, AlertTriangle } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Set the worker source - use HTTPS CDN
if (typeof pdfjsLib.GlobalWorkerOptions !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

const RealEstateAuctionAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    executionTime: number;
    analysis: string;
    risks: string[];
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
    } else {
      alert('PDF 파일만 업로드 가능합니다.');
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ') + '\n';
    }

    return text;
  };

  const analyzeWithAI = async (text: string): Promise<{ analysis: string; risks: string[] }> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Gemini API 키가 설정되지 않았습니다. .env.local 파일에서 VITE_GEMINI_API_KEY를 설정하세요.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `다음은 부동산 경매 물건에 대한 PDF 내용입니다. 이 내용을 분석하여 다음을 포함한 결과를 제공하세요:
- 물건의 기본 정보 (위치, 감정가, 최저매각가격 등)
- 시장 분석 및 가치 평가
- 투자 잠재력

또한, 다음과 같은 위험 사항을 식별하세요:
- 법적 위험
- 환경적 위험
- 시장 위험

PDF 내용:
${text}

분석 결과를 구조화하여 제공하세요.`;

    try {
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      // Parse the AI response to extract analysis and risks
      const analysis = aiResponse.split('위험 사항')[0].trim();
      const risksText = aiResponse.split('위험 사항')[1]?.trim() || '';
      const risks = risksText
        .split('\n')
        .filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('•'))
        .map((line: string) => line.trim().replace(/^[-•]\s*/, '').trim());

      return { analysis, risks };
    } catch (error: any) {
      if (error.message?.includes('API key')) {
        throw new Error('Gemini API 키가 유효하지 않습니다. .env.local 파일의 VITE_GEMINI_API_KEY를 확인하세요.');
      }
      throw error;
    }
  };

  const analyzePDF = async () => {
    if (!file) return;

    setAnalyzing(true);
    const startTime = Date.now();

    try {
      const text = await extractTextFromPDF(file);
      const { analysis, risks } = await analyzeWithAI(text);

      const executionTime = Date.now() - startTime;

      setResult({
        executionTime,
        analysis,
        risks,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      const errorMessage = error instanceof Error ? error.message : '분석 중 오류가 발생했습니다.';
      alert(errorMessage);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">부동산 경매 물건 분석</h2>

      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/5">
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            PDF 파일 업로드 (문자와 표 포함)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-600 border-dashed rounded-lg cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-zinc-400" />
                <p className="mb-2 text-sm text-zinc-400">
                  <span className="font-semibold">클릭하여 PDF 파일 선택</span>
                </p>
                <p className="text-xs text-zinc-500">PDF 파일만 지원됩니다</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {file && (
          <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-300">{file.name}</span>
              <span className="text-zinc-500 text-sm">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
          </div>
        )}

        <button
          onClick={analyzePDF}
          disabled={!file || analyzing}
          className="w-full bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {analyzing ? '분석 중...' : '분석 시작 (Gemini)'}
        </button>
      </div>

      {result && (
        <div className="mt-8 bg-zinc-900 p-8 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-zinc-400" />
            <span className="text-zinc-300">동작 시간: {result.executionTime}ms</span>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-white">분석 결과</h3>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <pre className="text-zinc-300 whitespace-pre-wrap">{result.analysis}</pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              위험 사항
            </h3>
            <ul className="space-y-2">
              {result.risks.map((risk, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateAuctionAnalysis;