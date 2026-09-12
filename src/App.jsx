import { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Topbar from './components/common/Topbar';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [view, setView] = useState('user');

  return (
    <div className="grid grid-cols-1 md:grid-cols-[232px_1fr] min-h-screen">
      <Sidebar />
      <div className="flex flex-col min-w-0 pb-16 md:pb-0">
        <Topbar view={view} onViewChange={setView} />
        <div className="p-4 md:p-5.5 pb-10">
          {view === 'user' ? <UserDashboard /> : <AdminDashboard />}
        </div>
      </div>
    </div>
  );
}
