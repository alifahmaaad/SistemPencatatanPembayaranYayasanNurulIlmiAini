import {
  Alert,
  Box,
  Button,
  MenuItem,
  MenuList,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buttonSX } from "../../buttonsx";
import CheckboxBulan from "../../component/CheckboxBulan";
import Header from "../../component/Header";
import React from "react";
import FormatAngka from "../../component/FormatAngka";
import { getSpp } from "../../Database/SPP/dbspp";
import { getKomite } from "../../Database/Komite/dbkomite";
import { getPendaftaran } from "../../Database/pendaftaran/dbpendaftaran";
import { getPendaftaranUlang } from "../../Database/pendaftaranulang/dbpendaftaranulang";
import { getLes } from "../../Database/Les/dbles";
import { getLesUN } from "../../Database/lesun/dblesun";
import { getEkskul } from "../../Database/ekskul/dbekskul";
import { getQurban } from "../../Database/qurban/dbqurban";
import { getBuku } from "../../Database/buku/dbbuku";
import { getPakaian } from "../../Database/pakaian/dbpakaian";
const DetailSiswaTagihan = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [dataSpp, setDataSpp] = useState([]);
  const [dataKomite, setDataKomite] = useState([]);
  const [dataPendaftaran, setDataPendaftaran] = useState([]);
  const [dataPendaftaranUlang, setDataPendaftaranUlang] = useState([]);
  const [dataLes, setDataLes] = useState([]);
  const [dataLesUN, setDataLesUN] = useState([]);
  const [dataEkskul, setDataEkskul] = useState([]);
  const [dataQurban, setDataQurban] = useState([]);
  const [dataBuku, setDataBuku] = useState([]);
  const [dataPakaian, setDataPakaian] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  useEffect(() => {
    const getKelasinformation = async () => {
      setDataSpp(await getSpp(params.id_siswa));
      setDataKomite(await getKomite(params.id_siswa));
      setDataPendaftaran(await getPendaftaran(params.id_siswa));
      setDataPendaftaranUlang(await getPendaftaranUlang(params.id_siswa));
      setDataLes(await getLes(params.id_siswa));
      setDataLesUN(await getLesUN(params.id_siswa));
      setDataEkskul(await getEkskul(params.id_siswa));
      setDataQurban(await getQurban(params.id_siswa));
      setDataBuku(await getBuku(params.id_siswa));
      setDataPakaian(await getPakaian(params.id_siswa));
      setLoading(false);
    };
    getKelasinformation();
  }, []);
  return (
    <Box>
      {!Loading && (
        <Header
          title={
            "Detail Tagihan Siswa \n" +
            dataSpp[0].nama +
            "\n kelas (" +
            dataSpp[0].tingkat +
            ")" +
            dataSpp[0].kelas
          }
        />
      )}
      {!Loading && (
        <Box sx={{ width: "90%" }} margin="0 auto 0 auto">
          {isError && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              Nama Siswa pada NISN atau No absen tersebut sudah ada
            </Alert>
          )}
          {isError && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              Cek kembali data Tagihan
            </Alert>
          )}
          <h2>Detail Tagihan</h2>
          <Box
            display={"flex"}
            gap={"2rem"}
            flexWrap={"wrap"}
            paddingBottom={"1rem"}
          >
            <Typography>
              {dataPendaftaran.length > 0 ? (
                <Typography>Pendaftaran </Typography>
              ) : null}
              {dataPendaftaran.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <Box key={option.id} value={option.id}>
                    <b>{option.bulan}</b>
                    <li>
                      Terbayar : Rp.
                      {option.jumlah_terbayar.toLocaleString("id")}
                      <br />
                    </li>
                    <li>
                      Tagihan : Rp.
                      {option.jumlah_terhutang.toLocaleString("id")}
                      <br />
                    </li>
                    <li>
                      Sisa Tagihan : Rp.
                      {(
                        option.jumlah_terhutang - option.jumlah_terbayar
                      ).toLocaleString("id")}
                    </li>
                  </Box>
                </Box>
              ))}
            </Typography>
            <Typography>
              {dataPendaftaranUlang.length > 0 ? (
                <Typography>Pendaftaran Ulang</Typography>
              ) : null}
              {dataPendaftaranUlang.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <Box key={option.id} value={option.id}>
                    <b>{option.bulan}</b>
                    <li>
                      Terbayar : Rp.
                      {option.jumlah_terbayar.toLocaleString("id")}
                      <br />
                    </li>
                    <li>
                      Tagihan : Rp.
                      {option.jumlah_terhutang.toLocaleString("id")}
                      <br />
                    </li>
                    <li>
                      Sisa Tagihan : Rp.
                      {(
                        option.jumlah_terhutang - option.jumlah_terbayar
                      ).toLocaleString("id")}
                    </li>
                  </Box>
                </Box>
              ))}
            </Typography>
            <Typography>
              {dataBuku.length > 0 ? <Typography>Buku</Typography> : null}
              {dataBuku.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <Box key={option.id} value={option.id}>
                    <b>{option.bulan}</b>
                    <li>
                      Terbayar : Rp.
                      {option.jumlah_terbayar.toLocaleString("id")}
                      <br />
                    </li>
                    <li>
                      Tagihan : Rp.
                      {option.jumlah_terhutang.toLocaleString("id")}
                      <br />
                    </li>
                    <li>
                      Sisa Tagihan : Rp.
                      {(
                        option.jumlah_terhutang - option.jumlah_terbayar
                      ).toLocaleString("id")}
                    </li>
                  </Box>
                </Box>
              ))}
            </Typography>
            <Typography>
              {dataPakaian.length > 0 ? <Typography>Pakaian</Typography> : null}
              {dataPakaian.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <Box key={option.id} value={option.id}>
                    <b>{option.bulan}</b>
                    <li>
                      Terbayar : Rp.
                      {option.jumlah_terbayar.toLocaleString("id")}
                      <br />
                    </li>
                    <li>
                      Tagihan : Rp.
                      {option.jumlah_terhutang.toLocaleString("id")}
                      <br />
                    </li>
                    <li>
                      Sisa Tagihan : Rp.
                      {(
                        option.jumlah_terhutang - option.jumlah_terbayar
                      ).toLocaleString("id")}
                    </li>
                  </Box>
                </Box>
              ))}
            </Typography>
          </Box>
          <Box display={"flex"} gap={"2rem"} flexWrap={"wrap"}>
            <Typography>
              {dataSpp.length > 0 ? (
                <Typography>Sisa Tagihan Spp</Typography>
              ) : null}
              {dataSpp.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <li key={option.id} value={option.id}>
                    <b>{option.bulan}</b> Rp.
                    {(
                      option.jumlah_terhutang - option.jumlah_terbayar
                    ).toLocaleString("id")}
                  </li>
                </Box>
              ))}
            </Typography>
            <Typography>
              {dataKomite.length > 0 ? (
                <Typography>Sisa Tagihan Komite</Typography>
              ) : null}
              {dataKomite.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <li key={option.id} value={option.id}>
                    <b>{option.bulan}</b> Rp.
                    {(
                      option.jumlah_terhutang - option.jumlah_terbayar
                    ).toLocaleString("id")}
                  </li>
                </Box>
              ))}
            </Typography>
            <Typography>
              {dataLes.length > 0 ? (
                <Typography>Sisa Tagihan Les</Typography>
              ) : null}
              {dataLes.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <li key={option.id} value={option.id}>
                    <b>{option.bulan}</b> Rp.
                    {(
                      option.jumlah_terhutang - option.jumlah_terbayar
                    ).toLocaleString("id")}
                  </li>
                </Box>
              ))}
            </Typography>
            <Typography>
              {dataLesUN.length > 0 ? (
                <Typography>Sisa Tagihan Les UN</Typography>
              ) : null}
              {dataLesUN.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <li key={option.id} value={option.id}>
                    <b>{option.bulan}</b> Rp.
                    {(
                      option.jumlah_terhutang - option.jumlah_terbayar
                    ).toLocaleString("id")}
                  </li>
                </Box>
              ))}
            </Typography>
            <Typography>
              {dataEkskul.length > 0 ? (
                <Typography>Sisa Tagihan Ekskul</Typography>
              ) : null}
              {dataEkskul.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <li key={option.id} value={option.id}>
                    <b>{option.bulan}</b> Rp.
                    {(
                      option.jumlah_terhutang - option.jumlah_terbayar
                    ).toLocaleString("id")}
                  </li>
                </Box>
              ))}
            </Typography>
            <Typography>
              {dataQurban.length > 0 ? (
                <Typography>Sisa Tagihan Qurban</Typography>
              ) : null}
              {dataQurban.map((option) => (
                <Box paddingLeft={"1rem"}>
                  <li key={option.id} value={option.id}>
                    <b>{option.bulan}</b> Rp.
                    {(
                      option.jumlah_terhutang - option.jumlah_terbayar
                    ).toLocaleString("id")}
                  </li>
                </Box>
              ))}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DetailSiswaTagihan;
