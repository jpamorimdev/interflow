import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Chats from './pages/chat/Chats';
import Chat from './pages/chat/Chat';
import Customers from './pages/customers/Customers';
import CustomerChats from './pages/customers/CustomerChats';
import AddCustomer from './pages/customers/AddCustomer';
import SettingsPage from './pages/settings/Settings';
import BillingPage from './pages/settings/Billing';
import IntegrationsPage from './pages/settings/Integrations';
import NotificationsPage from './pages/settings/Notifications';
import UsagePage from './pages/settings/Usage';
import Login from './pages/Login';
import Organizations from './pages/admin/Organizations';
import AddOrganization from './pages/admin/AddOrganization';
import TeamMembers from './pages/organization/TeamMembers';
import ServiceTeams from './pages/organization/ServiceTeams';
import Channels from './pages/organization/Channels';
import SelectChannelType from './pages/organization/channels/SelectChannelType';
import EmailChannelForm from './pages/organization/channels/EmailChannelForm';
import WhatsAppOfficialForm from './pages/organization/channels/WhatsAppOfficialForm';
import WhatsAppWApiForm from './pages/organization/channels/WhatsAppWApiForm';
import WhatsAppZApiForm from './pages/organization/channels/WhatsAppZApiForm';
import WhatsAppEvoForm from './pages/organization/channels/WhatsAppEvoForm';
import FacebookForm from './pages/organization/channels/FacebookForm';
import InstagramForm from './pages/organization/channels/InstagramForm';
import MessageShortcuts from './pages/organization/MessageShortcuts';
import FlowList from './pages/flow/FlowList';
import FlowEditor from './pages/flow/FlowEditor';
import CRMFunnels from './pages/crm/CRMFunnels';
import CRMFunnel from './pages/crm/CRMFunnel';
import Profile from './pages/Profile';
import Tags from './pages/Tags';
import Prompts from './pages/prompts/Prompts';
import PromptFormPage from './pages/prompts/PromptForm';
import { useAuth } from './hooks/useAuth';
import { LoadingScreen } from './components/LoadingScreen';
import { ThemeProvider } from './providers/ThemeProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Home from './pages/index';
import SignupPage from './pages/public/signup/page';

function AppContent() {
  const { session, profile, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Enquanto estiver carregando, mostra o loading em todas as rotas
  if (loading) {
    return (
      <Routes>
        <Route path="*" element={<LoadingScreen />} />
      </Routes>
    );
  }

  // Se não estiver autenticado, permite acesso apenas às rotas públicas
  if (!session) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Redireciona qualquer outra rota para a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Se estiver autenticado
  return (
    <Routes>
      {/* Rota pública mesmo quando logado */}
      <Route path="/" element={<Home />} />

      {/* Redireciona /login e /signup para /app quando já estiver logado */}
      <Route path="/login" element={<Navigate to="/app" replace />} />
      <Route path="/signup" element={<Navigate to="/app" replace />} />

      {/* Rotas protegidas */}
      <Route
        path="/app/*"
        element={
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:block flex-shrink-0 transition-all duration-300 ease-in-out">
              <Sidebar onClose={() => setSidebarOpen(false)} isMobile={false} />
            </aside>

            {/* Sidebar Mobile e Overlay */}
            {sidebarOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden transition-opacity"
                  onClick={() => setSidebarOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
                  <Sidebar onClose={() => setSidebarOpen(false)} isMobile={true} />
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            {!sidebarOpen && (
              <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                  type="button"
                  className="p-2 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 shadow-lg"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 relative flex flex-col w-0 overflow-hidden">
              <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="chats" element={<Chats />} />
                    <Route path="chats/:id" element={<Chat />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="customers/:id/chats" element={<CustomerChats />} />
                    <Route path="customers/add" element={<AddCustomer />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="settings/billing" element={<BillingPage />} />
                    <Route path="settings/integrations" element={<IntegrationsPage />} />
                    <Route path="settings/notifications" element={<NotificationsPage />} />
                    <Route path="settings/usage" element={<UsagePage />} />
                    <Route path="team" element={<TeamMembers />} />
                    <Route path="service-teams" element={<ServiceTeams />} />
                    <Route path="channels" element={<Channels />} />
                    <Route path="channels/new" element={<SelectChannelType />} />
                    <Route path="channels/new/email" element={<EmailChannelForm />} />
                    <Route path="channels/new/whatsapp_official" element={<WhatsAppOfficialForm />} />
                    <Route path="channels/new/whatsapp_wapi" element={<WhatsAppWApiForm />} />
                    <Route path="channels/new/whatsapp_zapi" element={<WhatsAppZApiForm />} />
                    <Route path="channels/new/whatsapp_evo" element={<WhatsAppEvoForm />} />
                    <Route path="channels/new/facebook" element={<FacebookForm />} />
                    <Route path="channels/new/instagram" element={<InstagramForm />} />
                    <Route path="channels/:id/edit/email" element={<EmailChannelForm />} />
                    <Route path="channels/:id/edit/whatsapp_official" element={<WhatsAppOfficialForm />} />
                    <Route path="channels/:id/edit/whatsapp_wapi" element={<WhatsAppWApiForm />} />
                    <Route path="channels/:id/edit/whatsapp_zapi" element={<WhatsAppZApiForm />} />
                    <Route path="channels/:id/edit/whatsapp_evo" element={<WhatsAppEvoForm />} />
                    <Route path="channels/:id/edit/facebook" element={<FacebookForm />} />
                    <Route path="channels/:id/edit/instagram" element={<InstagramForm />} />
                    <Route path="shortcuts" element={<MessageShortcuts />} />
                    <Route path="flows" element={<FlowList />} />
                    <Route path="flows/:id" element={<FlowEditor />} />
                    <Route path="crm" element={<CRMFunnels />} />
                    <Route path="crm/:id" element={<CRMFunnel />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="tags" element={<Tags />} />
                    <Route path="prompts" element={<Prompts />} />
                    <Route path="prompts/new" element={<PromptFormPage />} />
                    <Route path="prompts/edit/:id" element={<PromptFormPage />} />
                    {profile?.is_superadmin && (
                      <>
                        <Route path="admin/organizations" element={<Organizations />} />
                        <Route path="admin/organizations/add" element={<AddOrganization />} />
                      </>
                    )}
                  </Routes>
                </Suspense>
              </main>
            </div>
          </div>
        }
      />

      {/* Redireciona rotas não encontradas para /app */}
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;