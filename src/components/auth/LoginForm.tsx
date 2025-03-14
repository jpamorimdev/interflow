import React, { useState } from 'react';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectPath?: string;
  isModal?: boolean;
}

export default function LoginForm({ onSuccess, redirectPath, isModal = false }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuthContext();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = redirectPath || searchParams.get('redirect') || '/app';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        if (signInError.message === 'Invalid login credentials') {
          setError(t('login.errors.invalidCredentials'));
        } else {
          setError(t('login.errors.generic'));
        }
      } else {
        // Se o login for bem-sucedido
        if (onSuccess) {
          onSuccess();
        } else {
          // Verificar se há um token de convite pendente
          const pendingToken = localStorage.getItem('pendingJoinToken');
          
          if (pendingToken && redirect === 'join') {
            navigate(`/join?token=${pendingToken}`);
            localStorage.removeItem('pendingJoinToken');
          } else {
            navigate(redirect);
          }
        }
      }
    } catch {
      setError(t('login.errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className={`space-y-5 ${isModal ? '' : 'bg-white dark:bg-gray-800 p-5 sm:p-6 shadow rounded-lg'}`} onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/50 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800 flex items-center">
            <div className="mr-2 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            {error}
          </div>
        )}
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200">
            <Mail size={18} />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 pr-3 py-2.5 transition-all duration-200"
            placeholder={t('login.fields.email')}
          />
        </div>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200">
            <Lock size={18} />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 pr-3 py-2.5 transition-all duration-200"
            placeholder={t('login.fields.password')}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:translate-y-[-1px] hover:shadow-lg mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t('common:loading')}
            </>
          ) : (
            t('login.signIn')
          )}
        </button>

        {!isModal && (
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('login.noAccount')}{' '}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {t('login.createAccount')}
              </Link>
            </p>
          </div>
        )}
        
        {/* Botão de depuração - remover em produção */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="mt-4 border-t pt-4">
            <p className="text-xs text-gray-500 mb-2">Ferramentas de depuração:</p>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={async () => {
                  // Verificar se já temos um usuário logado
                  const { data: { session } } = await supabase.auth.getSession();
                  if (session?.user) {
                    // Redirecionar para o dashboard
                    navigate('/app');
                  }
                }}
                className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded"
              >
                Ir para dashboard
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
} 