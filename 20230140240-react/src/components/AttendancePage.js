import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const COLORS = {
  primary: "#6A5ACD",
  secondary: "#ADD8E6",
  background: "#F0F8FF",
  card: "#FFFFFF",
  checkIn: "#90EE90",
  checkOut: "#FFB6C1",
  shadow: "rgba(106, 90, 205, 0.15)",
};

if (L.Icon) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
}

function PresensiCard() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(null);
  const [image, setImage] = useState(null);

  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const getAuthConfig = () => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser ini.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
      },
      (err) => {
        let msg = "Gagal mendapatkan lokasi: " + err.message;
        if (err.code === err.PERMISSION_DENIED) {
          msg = "Akses lokasi ditolak. Presensi tidak bisa dilakukan.";
        }
        setError(msg);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setImage(imageSrc);
  }, []);

  const handleCheckIn = async () => {
    setError("");
    setMessage("");

    const config = getAuthConfig();
    if (!config) return;

    if (!coords || !image) {
      setError("Lokasi dan Foto wajib ada!");
      return;
    }

    try {
      const blob = await (await fetch(image)).blob();

      const formData = new FormData();
      formData.append("latitude", coords.lat);
      formData.append("longitude", coords.lng);
      formData.append("buktiFoto", blob, "selfie.jpg");

      const response = await axios.post(
        "http://localhost:3001/api/presensi/check-in",
        formData,
        config
      );

      setMessage(response.data.message);
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.message || "Check-In gagal");
    }
  };

  const handleCheckOut = async () => {
    setError("");
    setMessage("");

    const config = getAuthConfig();
    if (!config) return;

    try {
      const response = await axios.post(
        "http://localhost:3001/api/presensi/check-out",
        {},
        config
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Check-Out gagal");
    }
  };

  return (
    <div
      className="flex items-center justify-center px-3 py-3"
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, ${COLORS.secondary} 100%)`,
        minHeight: "100vh",
      }}
    >
      <div
        className="w-full max-w-md text-center rounded-2xl shadow-xl p-4"
        style={{
          backgroundColor: COLORS.card,
          boxShadow: `0 10px 20px ${COLORS.shadow}`,
        }}
      >
        <h2
          className="text-xl font-extrabold mb-2"
          style={{ color: COLORS.primary }}
        >
          Aktivitas Presensi
        </h2>

        {coords ? (
          <div
            className="w-full border-2 border-dashed rounded-xl overflow-hidden"
            style={{ borderColor: COLORS.secondary }}
          >
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={15}
              scrollWheelZoom={false}
              className="w-full"
              style={{ height: "22vh", minHeight: "150px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[coords.lat, coords.lng]}>
                <Popup>Lokasi Presensi Anda</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <div
            className="w-full p-2 rounded-lg bg-yellow-50 border text-sm"
            style={{ borderColor: COLORS.secondary, color: COLORS.primary }}
          >
            Memuat lokasi...
          </div>
        )}

        <div className="w-full mt-2 border rounded-xl overflow-hidden bg-black">
          {image ? (
            <img
              src={image}
              alt="Selfie"
              className="w-full object-cover"
              style={{ height: "22vh", minHeight: "150px" }}
            />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full"
              videoConstraints={{ facingMode: "user" }}
              style={{ height: "22vh", minHeight: "150px" }}
            />
          )}
        </div>

        <div className="mt-2">
          {!image ? (
            <button
              onClick={capture}
              className="w-full py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition text-sm"
            >
              Ambil Foto 📸
            </button>
          ) : (
            <button
              onClick={() => setImage(null)}
              className="w-full py-2 rounded-lg text-white font-semibold bg-gray-600 hover:bg-gray-700 transition text-sm"
            >
              Foto Ulang 🔄
            </button>
          )}
        </div>

        {message && (
          <p className="mt-2 text-green-700 bg-green-100 p-2 rounded-lg text-sm font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-2 text-red-700 bg-red-100 p-2 rounded-lg text-sm font-medium">
            {error}
          </p>
        )}

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleCheckIn}
            disabled={!coords}
            className="flex-1 py-2 rounded-lg font-bold shadow transition hover:scale-[1.02] text-sm"
            style={{
              backgroundColor: COLORS.checkIn,
              color: COLORS.primary,
            }}
          >
            Check-In
          </button>

          <button
            onClick={handleCheckOut}
            className="flex-1 py-2 rounded-lg font-bold shadow transition hover:scale-[1.02] text-sm"
            style={{
              backgroundColor: COLORS.checkOut,
              color: COLORS.primary,
            }}
          >
            Check-Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default PresensiCard;
