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
import DataSpp from "./pages/Pembayaran/SPP/DataSPP";
import DetailSpp from "./pages/Pembayaran/SPP/DetailSpp";
import DetailKomite from "./pages/Pembayaran/Komite/DetailKomite";
import DataKomite from "./pages/Pembayaran/Komite/DataKomite";
import DataLes from "./pages/Pembayaran/Les/DataLes";
import DetailLes from "./pages/Pembayaran/Les/DetailLes";
import DataLes_un from "./pages/Pembayaran/Les Un/DataLesUN";
import DetailLes_un from "./pages/Pembayaran/Les Un/DetailLesUN";
import DataEkskul from "./pages/Pembayaran/Ekskul/DataEkskul";
import DetailEkskul from "./pages/Pembayaran/Ekskul/DetailEkskul";
import DataPendaftaran from "./pages/Pembayaran/Pendaftaran/DataPendaftaran";
import Datapendaftaran_ulang from "./pages/Pembayaran/Pendaftaran ulang/DataPendaftaranUlang";
import Databuku from "./pages/Pembayaran/buku/DataBuku";
import Datapakaian from "./pages/Pembayaran/pakaian/DataPakaian";
import DataHarian from "./pages/Laporan/Harian";
import DataBulanan from "./pages/Laporan/Bulanan";
import DataQurban from "./pages/Pembayaran/qurban/DataQurban";
import DetailQurban from "./pages/Pembayaran/qurban/DetailQurban";
import CreateSpp from "./pages/Pembayaran/SPP/CreateSPP";
import CreateEkskul from "./pages/Pembayaran/Ekskul/CreateEkskul";
import CreateKomite from "./pages/Pembayaran/Komite/CreateKomite";
import CreateLes from "./pages/Pembayaran/Les/CreateLes";
import CreateLesUN from "./pages/Pembayaran/Les Un/CreateLesUN";

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
            <Route path="/Pembayaran/spp" element={<DataSpp />} />
            <Route path="/Pembayaran/spp/:id_siswa" element={<DetailSpp />} />
            <Route
              path="/Pembayaran/spp/:id_siswa/tambah"
              element={<CreateSpp />}
            />
            <Route path="/Pembayaran/Komite" element={<DataKomite />} />
            <Route
              path="/Pembayaran/Komite/:id_siswa"
              element={<DetailKomite />}
            />
            <Route
              path="/Pembayaran/Komite/:id_siswa/tambah"
              element={<CreateKomite />}
            />
            <Route path="/Pembayaran/Les" element={<DataLes />} />
            <Route path="/Pembayaran/Les/:id_siswa" element={<DetailLes />} />
            <Route
              path="/Pembayaran/Les/:id_siswa/tambah"
              element={<CreateLes />}
            />
            <Route path="/Pembayaran/lesun" element={<DataLes_un />} />
            <Route
              path="/Pembayaran/lesun/:id_siswa"
              element={<DetailLes_un />}
            />
            <Route
              path="/Pembayaran/lesun/:id_siswa/tambah"
              element={<CreateLesUN />}
            />
            <Route path="/Pembayaran/Ekskul" element={<DataEkskul />} />
            <Route
              path="/Pembayaran/Ekskul/:id_siswa"
              element={<DetailEkskul />}
            />
            <Route
              path="/Pembayaran/Ekskul/:id_siswa/tambah"
              element={<CreateEkskul />}
            />
            <Route path="/Pembayaran/daftar" element={<DataPendaftaran />} />
            <Route
              path="/Pembayaran/daftarulang"
              element={<Datapendaftaran_ulang />}
            />
            <Route path="/Pembayaran/buku" element={<Databuku />} />
            <Route path="/Pembayaran/pakaian" element={<Datapakaian />} />
            <Route path="/Pembayaran/qurban" element={<DataQurban />} />
            <Route
              path="/Pembayaran/qurban/:id_siswa"
              element={<DetailQurban />}
            />
            <Route path="/Laporan/harian" element={<DataHarian />} />
            <Route path="/Laporan/bulanan" element={<DataBulanan />} />
          </Routes>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
