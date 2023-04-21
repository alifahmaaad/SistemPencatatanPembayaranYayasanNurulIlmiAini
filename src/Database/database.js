import Database from "tauri-plugin-sql-api";

import bcrypt from "bcryptjs";
import { getSPPbybulanidsiswa } from "./SPP/dbspp";
import { getKomitebybulanidsiswa } from "./Komite/dbkomite";
import { getLesbybulanidsiswa } from "./Les/dbles";
import { getLesUNbybulanidsiswa } from "./lesun/dblesun";
import { getEkskulbybulanidsiswa } from "./ekskul/dbekskul";
import { getPendaftaranbyidsiswa } from "./pendaftaran/dbpendaftaran";
import { getPendaftaran_ulangbyidsiswa } from "./pendaftaranulang/dbpendaftaranulang";
import { getbukubyidsiswa } from "./buku/dbbuku";
import { getpakaianbyidsiswa } from "./pakaian/dbpakaian";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");

export const CreateAllTable = async () => {
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS user
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS kelas
(
  tingkat TEXT NOT NULL,
  kelas TEXT NOT NULL,
  isArchive INTEGER NOT NULL,
  id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE IF NOT EXISTS siswa
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  nisn_atau_no_absen TEXT NOT NULL,
  id_kelas INTEGER NOT NULL,
  FOREIGN KEY (id_kelas) REFERENCES kelas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS spp
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bulan TEXT NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  jumlah_terhutang INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL ,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS komite
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  bulan TEXT NOT NULL,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS les_un
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  bulan TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS les
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  bulan TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS qurban
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah INTEGER NOT NULL,
  tanggal TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ekskul
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  bulan TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pendaftaran
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pendaftaran_ulang
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS buku
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pakaian
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS history_bayar
(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_bayar INTEGER NOT NULL,
  jenis_nama TEXT NOT NULL,
  jenis_bulan TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE
);`);
  } catch (e) {
    console.error(e);
  } finally {
    console.log("Database Table has been created!!");
  }

  // console.log("test");
};
export const makeAdminAccount = async () => {
  try {
    const username = "admin123";
    const myPlaintextPassword = "admin123";
    const role = 1;
    const hashpassword = bcrypt.hashSync(myPlaintextPassword, 10);
    await db.execute(
      `INSERT INTO user (username,password,role)
VALUES('` +
        username +
        `','` +
        hashpassword +
        `','` +
        role +
        `');`
    );
  } catch (e) {
    console.error(e);
  } finally {
    console.log("account has been created!!");
  }
};
export const makeDevAccount = async () => {
  try {
    const username = "Dev123";
    const myPlaintextPassword = "Dev123";
    const role = 99;
    const hashpassword = bcrypt.hashSync(myPlaintextPassword, 10);
    await db.execute(
      `INSERT INTO user (username,password,role)
VALUES('` +
        username +
        `','` +
        hashpassword +
        `','` +
        role +
        `');`
    );
  } catch (e) {
    console.error(e);
  } finally {
    console.log("account has been created!!");
  }
};
export const checkUsername = async (username) => {
  try {
    const has = await db.select(
      `SELECT 1 FROM user WHERE username='` + username + `' ;`
    );
    return has.length;
  } catch (e) {
    console.error(e);
  }
};
export const loginaccount = async (username, password) => {
  try {
    const hashpw = await db.select(
      `SELECT password,role FROM user WHERE username='` + username + `' ;`
    );
    return [bcrypt.compareSync(password, hashpw[0].password), hashpw[0].role];
  } catch (e) {
    console.error(e);
  }
};
export const checkKelas = async (tingkat, kelas) => {
  try {
    const has = await db.select(
      `SELECT 1 FROM kelas WHERE tingkat='` +
        tingkat +
        `'AND kelas='` +
        kelas +
        `';`
    );
    return has.length;
  } catch (e) {
    console.error(e);
  }
};
export const create_kelas = async (tingkat, kelas, isArchive) => {
  try {
    await db.execute(
      `INSERT INTO kelas (kelas,tingkat,isArchive)
VALUES('` +
        kelas +
        `','` +
        tingkat +
        `','` +
        isArchive +
        `');`
    );
  } catch (e) {
    console.error(e);
  }
};
export const getKelas = async (typeclass) => {
  try {
    const Kelas = await db.select(
      `SELECT * FROM kelas WHERE isArchive='` + typeclass + `';`
    );
    return Kelas;
  } catch (e) {
    console.error(e);
  }
};
export const getKelasByid = async (id) => {
  try {
    const Kelas = await db.select(`SELECT * FROM kelas WHERE id='` + id + `';`);
    return Kelas;
  } catch (e) {
    console.error(e);
  }
};
export const setTypeKelas = async (typeclass, id) => {
  try {
    await db.execute(
      `UPDATE kelas SET isArchive='` + typeclass + `'WHERE ID = ` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const getSiswa = async (id) => {
  try {
    const siswa = await db.select(
      `SELECT * ,siswa.id as id FROM siswa INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return siswa;
  } catch (e) {
    console.error(e);
  }
};
export const getSiswabyId = async (id) => {
  try {
    const siswa = await db.select(
      `SELECT * ,siswa.id as id FROM siswa INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id='` +
        id +
        `' ;`
    );
    return siswa;
  } catch (e) {
    console.error(e);
  }
};
export const getSiswabyno_absen = async (id, nisn_no_absen) => {
  try {
    const siswa = await db.select(
      `SELECT * FROM siswa WHERE id_kelas='` +
        id +
        `' AND nisn_atau_no_absen='` +
        nisn_no_absen +
        `';`
    );
    return siswa;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa = async (id_kelas, nama, nisn_atau_no_absen) => {
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_no_absen);
    if (siswa.length > 0) {
      return true;
    } else {
      await db.execute(
        `INSERT INTO siswa (id_kelas,nama,nisn_atau_no_absen) 
VALUES('` +
          id_kelas +
          `','` +
          nama +
          `','` +
          nisn_atau_no_absen +
          `');`
      );
    }
  } catch (e) {
    console.error(e);
  }
};
export const create_history = async (
  jumlah_bayar,
  jenis_nama,
  jenis_bulan,
  id_siswa
) => {
  try {
    const tanggal = new Date().toLocaleDateString("id");
    await db.execute(
      `INSERT INTO history_bayar (jumlah_bayar,jenis_nama,jenis_bulan,id_siswa,created_at)
VALUES('` +
        jumlah_bayar +
        `','` +
        jenis_nama +
        `','` +
        jenis_bulan +
        `','` +
        id_siswa +
        `','` +
        tanggal +
        `');`
    );
  } catch (e) {
    console.error(e);
  }
};

export const check_bfr_create_siswa = async (
  BulanSPP,
  BulanKomite,
  BulanLes,
  BulanLesUN,
  BulanEkskul,
  nisn_atau_no_absen,
  id_kelas
) => {
  let error = false;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_no_absen);
    if (siswa.length > 0) {
      const id_siswa = siswa[0].id;
      for (let i = 0; i < BulanSPP.length; i++) {
        let isSppAda = await getSPPbybulanidsiswa(BulanSPP[i], id_siswa);
        if (isSppAda.length > 0) error = true;
      }
      for (let i = 0; i < BulanKomite.length; i++) {
        let isKomiteAda = await getKomitebybulanidsiswa(
          BulanKomite[i],
          id_siswa
        );
        if (isKomiteAda.length > 0) error = true;
      }
      for (let i = 0; i < BulanLes.length; i++) {
        let isLesAda = await getLesbybulanidsiswa(BulanLes[i], id_siswa);
        if (isLesAda.length > 0) error = true;
      }
      for (let i = 0; i < BulanLesUN.length; i++) {
        let isLesUNAda = await getLesUNbybulanidsiswa(BulanLesUN[i], id_siswa);
        if (isLesUNAda.length > 0) error = true;
      }
      for (let i = 0; i < BulanEkskul.length; i++) {
        let isEkskulAda = await getEkskulbybulanidsiswa(
          BulanEkskul[i],
          id_siswa
        );
        if (isEkskulAda.length > 0) error = true;
      }
      let isPendaftaranAda = await getPendaftaranbyidsiswa(id_siswa);
      let isPendaftaran_ulangAda = await getPendaftaran_ulangbyidsiswa(
        id_siswa
      );
      let isbukuAda = await getbukubyidsiswa(id_siswa);
      let ispakaianAda = await getpakaianbyidsiswa(id_siswa);
      if (
        isPendaftaranAda.length > 0 ||
        isPendaftaran_ulangAda.length > 0 ||
        isbukuAda.length > 0 ||
        ispakaianAda.length > 0
      ) {
        error = true;
      }
      error = true;
      return error;
    }
  } catch (e) {
    console.error(e);
  }
};
export const deletesiswa = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM siswa WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
export const deletekelas = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM kelas WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
export default {
  CreateAllTable,
  makeAdminAccount,
  makeDevAccount,
};
