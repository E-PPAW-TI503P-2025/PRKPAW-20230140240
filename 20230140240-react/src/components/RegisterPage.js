import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    role: 'mahasiswa'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error saat user mulai mengetik
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validasi sederhana
    if (!formData.nama || !formData.email || !formData.password) {
      setError('Semua field harus diisi!');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect ke login setelah berhasil register
        navigate('/login');
      } else {
        setError(data.message || 'Registrasi gagal!');
      }
    } catch (err) {
      setError('Terjadi kesalahan! Pastikan server berjalan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Bling Bling Background Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
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
            <div className="text-yellow-300 text-xl opacity-50">✨</div>
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header Card */}
        <div className="text-center mb-6">
          <div className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-1 rounded-full mb-4 shadow-2xl animate-pulse">
            <div className="bg-white rounded-full p-4">
              <span className="text-5xl">🎓</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-2xl">
            Buat Akun Baru ✨
          </h1>
          <p className="text-purple-200 text-lg">
            Bergabunglah dengan kami sekarang!
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-8 border-4 border-purple-300 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full opacity-20 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200 rounded-full opacity-20 -ml-12 -mb-12"></div>
          
          {/* Sparkles inside card */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400 text-sm animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ✨
            </div>
          ))}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 animate-pulse">
                <span>⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Nama Field */}
            <div>
              <label className="block text-purple-800 font-bold mb-2 flex items-center">
                <span className="mr-2">👤</span>
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-3 border-3 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-yellow-400 transition-all bg-white shadow-md hover:shadow-lg"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-purple-800 font-bold mb-2 flex items-center">
                <span className="mr-2">📧</span>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contoh@email.com"
                className="w-full px-4 py-3 border-3 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-yellow-400 transition-all bg-white shadow-md hover:shadow-lg"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-purple-800 font-bold mb-2 flex items-center">
                <span className="mr-2">🔒</span>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-3 border-3 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-yellow-400 transition-all bg-white shadow-md hover:shadow-lg"
                  required
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

            {/* Role Field */}
            <div>
              <label className="block text-purple-800 font-bold mb-3 flex items-center">
                <span className="mr-2">🎭</span>
                Pilih Role
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`cursor-pointer ${
                    formData.role === 'mahasiswa'
                      ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white border-yellow-400'
                      : 'bg-white text-purple-700 border-purple-300'
                  } border-3 rounded-xl p-4 text-center font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="mahasiswa"
                    checked={formData.role === 'mahasiswa'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="text-3xl mb-2">🎓</div>
                  <div>Mahasiswa</div>
                </label>

                <label
                  className={`cursor-pointer ${
                    formData.role === 'admin'
                      ? 'bg-gradient-to-br from-pink-500 to-pink-700 text-white border-yellow-400'
                      : 'bg-white text-purple-700 border-purple-300'
                  } border-3 rounded-xl p-4 text-center font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="text-3xl mb-2">👑</div>
                  <div>Admin</div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-2xl transform transition-all duration-200 border-3 border-yellow-400 relative overflow-hidden ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 hover:from-purple-700 hover:via-pink-600 hover:to-purple-800 text-white hover:scale-105 hover:shadow-2xl'
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
                  Daftar Sekarang
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t-2 border-purple-300"></div>
            <span className="px-4 text-purple-600 font-medium">atau</span>
            <div className="flex-1 border-t-2 border-purple-300"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-purple-700 font-medium">
              Sudah punya akun?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-pink-600 font-bold hover:text-pink-700 underline decoration-2 decoration-yellow-400 hover:decoration-pink-500 transition-all"
              >
                Login di sini ✨
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-purple-200 text-sm">
            Dengan mendaftar, Anda menyetujui{' '}
            <span className="text-yellow-300 font-bold">Syarat & Ketentuan</span> kami
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;