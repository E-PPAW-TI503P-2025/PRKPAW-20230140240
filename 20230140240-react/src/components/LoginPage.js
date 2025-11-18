import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault(); 
  setError(null);
  setLoading(true);

  try {
    const response = await axios.post('http://localhost:3001/api/auth/login', {
      email,
      password
    });

    const token = response.data.token;
    const role = response.data.role || 'mahasiswa';

    // Ambil userName dari response, fallback berdasarkan role
    const name = response.data.userName || (role === 'admin' ? 'Admin' : 'Mahasiswa');

    // Simpan ke localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('role', role);

    navigate('/dashboard');

  } catch (err) {
    setError(err.response ? err.response.data.message : 'Login gagal');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-200 to-pink-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Bling Bling Background Sparkles */}
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
            <div className="text-white text-xl opacity-60">✨</div>
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-2xl animate-pulse"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500 p-1 rounded-full mb-4 shadow-2xl animate-pulse">
            <div className="bg-white rounded-full p-4">
              <span className="text-5xl">🔐</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-2xl">
            Selamat Datang! 💙
          </h1>
          <p className="text-blue-100 text-lg drop-shadow-lg">
            Login untuk melanjutkan
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-8 border-4 border-blue-200 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full opacity-30 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 rounded-full opacity-30 -ml-12 -mb-12"></div>
          
          {/* Sparkles inside card */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-300 text-sm animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ✨
            </div>
          ))}

          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent relative z-10">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 animate-pulse">
                <span>⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-blue-800 font-bold mb-2 flex items-center"
              >
                <span className="mr-2">📧</span>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                required
                className="w-full px-4 py-3 border-3 border-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-pink-400 transition-all bg-white shadow-md hover:shadow-lg"
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-blue-800 font-bold mb-2 flex items-center"
              >
                <span className="mr-2">🔒</span>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full px-4 py-3 border-3 border-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-pink-400 transition-all bg-white shadow-md hover:shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                className="text-pink-600 font-semibold hover:text-pink-700 underline decoration-2 decoration-blue-400 hover:decoration-pink-500 transition-all text-sm"
              >
                Lupa Password? 🤔
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-2xl transform transition-all duration-200 border-3 border-blue-300 relative overflow-hidden ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500 hover:from-blue-500 hover:via-pink-500 hover:to-blue-600 text-white hover:scale-105 hover:shadow-2xl'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🚀</span>
                  Login Sekarang
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center relative z-10">
            <div className="flex-1 border-t-2 border-blue-300"></div>
            <span className="px-4 text-blue-600 font-medium">atau</span>
            <div className="flex-1 border-t-2 border-blue-300"></div>
          </div>

          {/* Register Link */}
          <div className="text-center relative z-10">
            <p className="text-blue-700 font-medium">
              Belum punya akun?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-pink-600 font-bold hover:text-pink-700 underline decoration-2 decoration-blue-400 hover:decoration-pink-500 transition-all"
              >
                Daftar di sini ✨
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-blue-100 text-sm drop-shadow-lg">
            Dengan login, Anda menyetujui{' '}
            <span className="text-white font-bold">Syarat & Ketentuan</span> kami
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
