import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; 
import L from 'leaflet';

// --- SKEMA WARNA LEMBUT BARU ---
const COLORS = {
  primary: "#6A5ACD",    // Slate Blue / Lavender gelap (untuk teks utama)
  secondary: "#ADD8E6",  // Light Blue (untuk aksen/hover)
  background: "#F0F8FF", // Alice Blue (background halaman)
  card: "#FFFFFF",       // Putih bersih
  checkIn: "#90EE90",    // Light Green (Check-In)
  checkOut: "#FFB6C1",   // Light Pink (Check-Out)
  disabled: "#E0E0E0",   // Gray sangat lembut
  shadow: "rgba(106, 90, 205, 0.15)", // Shadow lembut dari warna primary
};

// Fix for default Leaflet marker icon issue (common issue in bundlers)
if (L.Icon) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    // Menggunakan CDN untuk menghindari require() di Canvas
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}
// END FIX

function AttendancePage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(null); 
  const navigate = useNavigate();

  // Fungsi untuk mendapatkan header otentikasi JWT
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
  };

  // Fungsi untuk mendapatkan lokasi pengguna (Geolocation API)
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude, 
            lng: position.coords.longitude 
          });
          setError(null);
        },
        (error) => {
          let errorMessage = "Gagal mendapatkan lokasi: " + error.message;
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Akses lokasi ditolak. Presensi mungkin tidak dapat dilakukan.";
          }
          setError(errorMessage);
        }
      );
    } else {
      setError("Geolocation tidak didukung oleh browser ini.");
    }
  };

  // Dapatkan lokasi saat komponen dimuat
  useEffect(() => {
    getLocation(); 
  }, []); 

  const handleCheckIn = async () => {
    setError(""); 
    setMessage(""); 
    const config = getAuthHeaders();
    if (!config) return;

    if (!coords) {
      setError("Lokasi belum didapatkan. Mohon izinkan akses lokasi.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/presensi/check-in', {
        latitude: coords.lat, 
        longitude: coords.lng
      }, config);
      setMessage(response.data.message); 
    } catch (err) {
      setError(err.response?.data?.message || "Check-In gagal");
    }
  };

  const handleCheckOut = async () => {
    setError(""); 
    setMessage(""); 
    const config = getAuthHeaders();
    if (!config) return;
    
    try {
      const response = await axios.post("http://localhost:3001/api/presensi/check-out", {}, config);
      setMessage(response.data.message); 
    } catch (err) {
      setError(err.response?.data?.message || "Check-Out gagal");
    }
  };

  return (
    <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
            background: `linear-gradient(135deg, ${COLORS.background} 0%, ${COLORS.secondary} 100%)`, // Gradasi latar belakang
        }}
    >
      <div 
        className="p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center backdrop-blur-sm transform transition duration-500 hover:shadow-3xl"
        style={{ 
            backgroundColor: COLORS.card,
            boxShadow: `0 15px 30px ${COLORS.shadow}`, // Shadow ditingkatkan
        }}
      >
        <h2 className="text-3xl font-extrabold mb-8" style={{ color: COLORS.primary }}>
          Aktivitas Presensi
        </h2>

        {/* Visualisasi Peta menggunakan React Leaflet */}
        {coords ? (
            <div className="my-6 border-4 border-dashed rounded-xl overflow-hidden shadow-inner" 
                 style={{ borderColor: COLORS.secondary }}>
                <MapContainer 
                    center={[coords.lat, coords.lng]} 
                    zoom={15} 
                    scrollWheelZoom={false} // Disable zoom scroll untuk UX mobile
                    style={{ height: '300px', width: '100%', borderRadius: '8px' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[coords.lat, coords.lng]}>
                        <Popup>Lokasi Presensi Anda saat ini</Popup>
                    </Marker>
                </MapContainer>
            </div>
        ) : (
            <div className="my-6 p-4 text-center border-2 rounded-lg bg-yellow-50" 
                 style={{ borderColor: COLORS.secondary, color: COLORS.primary }}>
                <svg className="w-6 h-6 inline mr-2 animate-spin" fill="none" stroke={COLORS.primary} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0011.215 1C4.773 10.274 6.708 16 11.215 23"></path>
                </svg>
                Memuat lokasi... (Pastikan izin lokasi diberikan)
            </div>
        )}

        {/* Notifikasi */}
        {message && <p className="text-green-700 bg-green-100 p-3 rounded-lg mb-4 font-medium border-l-4 border-green-500">{message}</p>}
        {error && <p className="text-red-700 bg-red-100 p-3 rounded-lg mb-4 font-medium border-l-4 border-red-500">{error}</p>}

        {/* Tombol Aksi */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleCheckIn}
            className="flex-1 py-3 px-4 font-bold rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
            style={{ 
                backgroundColor: COLORS.checkIn, 
                color: COLORS.primary,
                boxShadow: `0 5px 15px ${COLORS.checkIn}66` // Shadow Check-In
            }}
            disabled={!coords} 
          >
            Check-In
          </button>

          <button
            onClick={handleCheckOut}
            className="flex-1 py-3 px-4 font-bold rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
            style={{ 
                backgroundColor: COLORS.checkOut, 
                color: COLORS.primary,
                boxShadow: `0 5px 15px ${COLORS.checkOut}66` // Shadow Check-Out
            }}
          >
            Check-Out
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default AttendancePage;