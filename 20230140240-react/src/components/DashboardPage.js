import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('User');
  const [userRole, setUserRole] = useState('mahasiswa'); // Tambahkan state untuk role
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Update waktu setiap detik dan ambil data user dari localStorage
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Ambil nama user dan role dari localStorage
    const storedName = localStorage.getItem('userName') || 'User';
    const storedRole = localStorage.getItem('role') || 'mahasiswa';
    
    setUserName(storedName);
    setUserRole(storedRole);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  // Capitalize first letter untuk role
  const formatRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const stats = [
    { title: 'Total Projects', value: '24', icon: '📊', color: 'from-purple-500 to-purple-700' },
    { title: 'Active Tasks', value: '12', icon: '✅', color: 'from-pink-500 to-pink-700' },
    { title: 'Completed', value: '156', icon: '🎯', color: 'from-purple-600 to-pink-600' },
    { title: 'Team Members', value: '8', icon: '👥', color: 'from-purple-700 to-purple-900' }
  ];

  const quickActions = [
    { title: 'New Project', icon: '➕', color: 'bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800' },
    { title: 'View Reports', icon: '📈', color: 'bg-gradient-to-br from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800' },
    { title: 'Settings', icon: '⚙️', color: 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' },
    { title: 'Messages', icon: '💬', color: 'bg-gradient-to-br from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 relative overflow-hidden">
      {/* Bling Bling Sparkles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div className="text-yellow-300 text-2xl opacity-60">✨</div>
          </div>
        ))}
      </div>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-900 to-purple-800 shadow-2xl border-b-4 border-yellow-400 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse">
                ✨
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
                Dashboard {formatRole(userRole)}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-yellow-300 drop-shadow-lg">
                <span className="text-sm font-medium">{formatDate(currentTime)}</span>
                <span className="text-lg font-bold text-yellow-400 animate-pulse">{formatTime(currentTime)}</span>
              </div>
              
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-200 border-2 border-yellow-400 hover:border-yellow-300 animate-pulse"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden border-4 border-yellow-400">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 opacity-20 rounded-full -mr-32 -mt-32 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-300 opacity-20 rounded-full -ml-24 -mb-24 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"></div>
          
          {/* Extra Sparkles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 text-xl animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ✨
            </div>
          ))}
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-2xl">
              {getGreeting()}, {userName}! 👋✨
            </h1>
            <p className="text-lg md:text-xl opacity-90 drop-shadow-lg">
              Selamat datang kembali di dashboard {formatRole(userRole)}. Siap untuk produktif hari ini? 💜
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-2xl p-6 transform hover:scale-110 transition-all duration-200 hover:shadow-2xl border-4 border-purple-300 hover:border-yellow-400 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-6xl opacity-10">✨</div>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl mb-4 shadow-lg border-2 border-yellow-300`}>
                {stat.icon}
              </div>
              <h3 className="text-purple-600 text-sm font-bold mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-2xl p-6 mb-8 border-4 border-purple-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-9xl opacity-5">✨</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`${action.color} text-white rounded-lg p-6 shadow-lg transform hover:scale-110 transition-all duration-200 hover:shadow-2xl border-2 border-yellow-300 hover:border-yellow-400 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
                <div className="text-4xl mb-2 relative z-10">{action.icon}</div>
                <div className="font-semibold relative z-10">{action.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-2xl p-6 border-4 border-purple-300 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 text-9xl opacity-5">💎</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Recent Activity
            </h2>
            <div className="space-y-3">
              {[
                { action: 'Completed Task #234', time: '5 min ago', color: 'bg-purple-100 text-purple-700 border border-purple-300' },
                { action: 'New comment on Project A', time: '15 min ago', color: 'bg-pink-100 text-pink-700 border border-pink-300' },
                { action: 'Updated profile settings', time: '1 hour ago', color: 'bg-purple-100 text-purple-700 border border-purple-300' },
                { action: 'Uploaded new document', time: '2 hours ago', color: 'bg-pink-100 text-pink-700 border border-pink-300' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors border-2 border-purple-200 hover:border-yellow-400 shadow-md">
                  <span className="text-purple-800 font-medium">{item.action}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${item.color} font-semibold`}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-2xl p-6 border-4 border-purple-300 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 text-9xl opacity-5">✨</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Today's Goals
            </h2>
            <div className="space-y-3">
              {[
                { task: 'Complete project presentation', progress: 75 },
                { task: 'Review team submissions', progress: 50 },
                { task: 'Update documentation', progress: 90 },
                { task: 'Schedule team meeting', progress: 100 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-800 font-medium">{item.task}</span>
                    <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3 border-2 border-purple-300">
                    <div
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 h-full rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white to-purple-100 rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all border-4 border-purple-400 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-300 text-xl animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                ✨
              </div>
            ))}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-yellow-300 animate-pulse">
                <span className="text-4xl">👋</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-2">Konfirmasi Logout</h3>
              <p className="text-purple-700 mb-6 font-medium">
                Apakah Anda yakin ingin keluar dari dashboard?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800 font-semibold rounded-lg hover:from-purple-300 hover:to-purple-400 transition-all shadow-md border-2 border-purple-400"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-purple-700 text-white font-semibold rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all border-2 border-yellow-400"
                >
                  Ya, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;