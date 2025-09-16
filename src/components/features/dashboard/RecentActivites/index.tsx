'use client';

import { userService } from '@/lib/service';
import { Suspense, useEffect, useState } from 'react';

export const RecentActivites = () => {
  const [activites, setActivites] = useState<Activites[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentActivites = async () => {
    const response: Activites[] = (await userService.getRecentActivities()) || [];
    setActivites(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecentActivites();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/5 rounded-xl shadow-md border border-white/10 p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">Atividades Recentes</h3>
        </div>
        <p className="text-sm text-gray-300">Carregando atividades...</p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="bg-white/5 rounded-xl shadow-md border border-white/10 p-6 max-w-7xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Atividades Recentes</h3>
          </div>
          <p className="text-sm text-gray-300">Carregando...</p>
        </div>
      }
    >
      <div className="bg-white/5 rounded-xl shadow-md border border-white/10 p-6 hover:bg-white/10 transition-all duration-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">Atividades Recentes</h3>
        </div>

        {activites.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-400">Nenhuma atividade recente</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activites.map((activite, index) => (
              <div
                key={activite.id}
                className="flex items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-indigo-500/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-bold text-indigo-300">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-200 font-medium">{activite.action}</p>
                </div>
                <div className="text-xs text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Suspense>
  );
};
