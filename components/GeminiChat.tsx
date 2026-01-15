import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Check } from 'lucide-react';

const GeminiChat: React.FC = () => {
  // GitHub Secrets 또는 환경 변수에서 API 키 로드
  const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const hasEnvKey = !!envApiKey;

  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(hasEnvKey);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when response updates
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const handleSetApiKey = () => {
    if (!apiKey.trim()) {
      setError('API 키를 입력해주세요');
      return;
    }
    setIsApiKeySet(true);
    setError('');
  };

  const handleResetApiKey = () => {
    setApiKey('');
    setIsApiKeySet(false);
    setResponse('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('질문을 입력해주세요');
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse('');

    // 환경 변수 또는 사용자 입력 API 키 사용
    const keyToUse = hasEnvKey ? envApiKey : apiKey;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': keyToUse,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API Error: ${response.status}`
        );
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('스트림 리더를 생성할 수 없습니다');
      }

      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6);
              const json = JSON.parse(jsonStr);

              if (
                json.candidates &&
                json.candidates[0] &&
                json.candidates[0].content &&
                json.candidates[0].content.parts &&
                json.candidates[0].content.parts[0]
              ) {
                const text = json.candidates[0].content.parts[0].text;
                fullResponse += text;
                setResponse(fullResponse);
              }
            } catch (e) {
              // Ignore JSON parse errors for incomplete data
            }
          }
        }
      }

      setPrompt('');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '오류가 발생했습니다';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Gemini AI
            </span>
            테스트 메뉴
          </h1>
          <p className="text-zinc-400">
            Gemini API를 사용하여 AI 모델의 동작을 확인합니다 (Streaming 방식)
          </p>
          {hasEnvKey && (
            <div className="mt-3 inline-block bg-green-900/30 border border-green-800 rounded px-3 py-1 text-xs text-green-300">
              ✓ GitHub Secrets에서 API 키가 로드되었습니다
            </div>
          )}
        </div>

        {!isApiKeySet ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 mb-6">
            <h2 className="text-xl font-semibold mb-4">API 키 설정</h2>
            <p className="text-zinc-400 text-sm mb-6">
              환경 변수에서 API 키를 찾을 수 없습니다. 아래에 API 키를 입력하거나 GitHub Secrets에 
              <code className="bg-zinc-800 px-2 py-1 rounded text-zinc-200">VITE_GEMINI_API_KEY</code>
              를 설정하세요.
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Google Gemini API 키
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setError('');
                  }}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition"
                />
                <p className="text-xs text-zinc-500 mt-2">
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Google Cloud Console
                  </a>
                  에서 API 키를 생성할 수 있습니다.
                </p>
              </div>
              <button
                onClick={handleSetApiKey}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                API 키 설정
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-zinc-300">
                  {hasEnvKey ? 'GitHub Secrets에서 API 키 로드됨' : 'API 키가 설정되었습니다'}
                </span>
              </div>
              {!hasEnvKey && (
                <button
                  onClick={handleResetApiKey}
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded transition"
                >
                  변경
                </button>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6"
            >
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                질문
              </label>
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setError('');
                }}
                placeholder="Gemini에게 물어볼 질문을 입력하세요..."
                disabled={isLoading}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                rows={4}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {isLoading ? '답변 생성 중...' : '전송'}
              </button>
            </form>

            {error && (
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6 text-red-400">
                <p className="text-sm font-medium">오류</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}

            {response && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-800/50">
                  <h3 className="font-semibold text-zinc-100">답변</h3>
                  <button
                    onClick={handleCopyResponse}
                    className="flex items-center gap-2 text-xs bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded transition"
                  >
                    {isCopied ? (
                      <>
                        <Check size={14} /> 복사됨
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> 복사
                      </>
                    )}
                  </button>
                </div>
                <div
                  ref={responseRef}
                  className="max-h-96 overflow-y-auto p-6 whitespace-pre-wrap text-zinc-300 leading-relaxed"
                >
                  {response}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GeminiChat;
