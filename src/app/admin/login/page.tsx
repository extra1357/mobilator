'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Login simples - você pode conectar com a API depois
    if (email && senha.length >= 6) {
      // Salva sessão
      localStorage.setItem('admin-logged', 'true');
      localStorage.setItem('admin-email', email);
      
      // Redireciona para dashboard
      router.push('/admin/dashboard');
    } else {
      setError('Email e senha são obrigatórios (mínimo 6 caracteres)');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-5xl">🏢</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Área Administrativa</h1>
            <p className="text-blue-100 text-sm mt-1">Imobiliária STR</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="••••••"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Entrando...
                  </span>
                ) : (
                  'Entrar no Dashboard'
                )}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-blue-600 transition"
              >
                ← Voltar para o site público
              </a>
            </div>
          </form>
        </div>

        {/* Dica */}
        <div className="mt-6 text-center">
          <p className="text-white text-sm opacity-90">
            💡 Pressione <kbd className="px-2 py-1 bg-white/20 rounded">Ctrl</kbd> + 
            <kbd className="px-2 py-1 bg-white/20 rounded mx-1">Alt</kbd> + 
            <kbd className="px-2 py-1 bg-white/20 rounded">Q</kbd> no site para acessar rapidamente
          </p>
        </div>
      </div>
    </div>
  );
}
