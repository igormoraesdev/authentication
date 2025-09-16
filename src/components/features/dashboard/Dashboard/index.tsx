import { format } from 'date-fns';

export default async function Dashboard({ user }: { user: CustomUser }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="bg-white/5 rounded-2xl shadow-lg border border-white/10 p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  Bem-vindo, {user?.name || 'Usuário'}!
                </h2>
                <p className="text-gray-300 text-lg">Tenha um ótimo dia de trabalho</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Perfil</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-gray-100">Nome:</span> {user?.name || 'N/A'}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-medium text-gray-100">Email:</span> {user?.email || 'N/A'}
              </p>
            </div>
          </div>
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Membro desde</h3>
            </div>
            <p className="text-sm text-gray-300">
              {format(user?.memberSince as string, 'dd-MM-yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
