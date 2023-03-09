import { Route, Routes, BrowserRouter, redirect } from "react-router-dom";
import DataSiswa from "./pages/Siswa/DataSiswa";
import "./index.css";
import SidebarComponent from "./component/SidebarComponent";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Setup from "./pages/setUp";
import DaftarKelas from "./pages/kelas/Datakelas";
import CreateKelas from "./pages/kelas/CreateKelas";
import CreateSiswa from "./pages/Siswa/CreateSiswa";

function App() {
  const isLogin = useSelector((state) => state.isLogin);
  return (
    <BrowserRouter>
      <div id="app">
        {isLogin ? <SidebarComponent /> : null}

        <Box
          sx={{
            width: "100%",
            padding: isLogin ? "1.5rem 1rem" : "0",
          }}
        >
          <Routes>
            <Route path="/" element={<Setup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/kelas" element={<DaftarKelas />} />
            <Route path="/kelas/tambah" element={<CreateKelas />} />
            <Route path="/siswa" element={<DataSiswa />} />
            <Route path="/siswa/tambah/:id_kelas" element={<CreateSiswa />} />

            {/* <Route path="/Pembayaran/spp" element={<Spp />} /> */}
            {/* <Route path="/Pembayaran/komite" element={<Komite />} /> */}
            {/* <Route path="/Pembayaran/daftar" element={<Pendaftaran />} /> */}
            {/* <Route path="/Pembayaran/daftarulang" element={<PendaftaranUlang />} /> */}
            {/* <Route path="/Pembayaran/les" element={<Les />} /> */}
            {/* <Routes path="/Pembayaran/ekskul" element={<Ekskul />} /> */}
            {/* <Routes path="/Pembayaran/qurban" element={<Qurban />} /> */}
            {/* <Routes path="/Pembayaran/buku" element={<Buku />} /> */}
            {/* <Routes path="/Pembayaran/pakaian" element={<Pakaian />} /> */}
            {/* <Routes path="/Laporan/harian" element={<LaporanHarian />} /> */}
            {/* <Routes path="/Laporan/bulanan" element={<LaporanBulanan />} /> */}
          </Routes>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
