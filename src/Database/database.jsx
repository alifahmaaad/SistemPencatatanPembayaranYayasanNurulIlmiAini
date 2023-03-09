import Database from "tauri-plugin-sql-api";

import bcrypt from "bcryptjs";
import { SkipPreviousRounded } from "@mui/icons-material";
// let db = null;
const db = await Database.load("sqlite:hay2e.db");

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
  FOREIGN KEY (id_kelas) REFERENCES kelas(id)
);

CREATE TABLE IF NOT EXISTS spp
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bulan TEXT NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  jumlah_terhutang INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL ,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS komite
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  bulan TEXT NOT NULL,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS les_un
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  bulan TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS les
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  bulan TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS qurban
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  bulan TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS ekskul
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  bulan TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS pendaftaran
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS pendaftaran_ulang
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS buku
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS pakaian
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_terhutang INTEGER NOT NULL,
  jumlah_terbayar INTEGER NOT NULL,
  id_siswa INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
);

CREATE TABLE IF NOT EXISTS history_bayar
(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
  jumlah_bayar INTEGER NOT NULL,
  jenis_nama TEXT NOT NULL,
  jenis_bulan TEXT NOT NULL,
  id_siswa INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (id_siswa) REFERENCES siswa(id)
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
export const getSPP = async (id) => {
  try {
    const spp = await db.select(
      `SELECT * FROM spp INNER JOIN siswa ON spp.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return spp;
  } catch (e) {
    console.error(e);
  }
};
export const getKomite = async (id) => {
  try {
    const komite = await db.select(
      `SELECT * FROM komite INNER JOIN siswa ON komite.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return komite;
  } catch (e) {
    console.error(e);
  }
};
export const getPendaftaran = async (id) => {
  try {
    const pendaftaran = await db.select(
      `SELECT * FROM pendaftaran INNER JOIN siswa ON pendaftaran.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return pendaftaran;
  } catch (e) {
    console.error(e);
  }
};
export const getPendaftaranUlang = async (id) => {
  try {
    const pendaftaran_ulang = await db.select(
      `SELECT * FROM pendaftaran_ulang INNER JOIN siswa ON pendaftaran_ulang.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return pendaftaran_ulang;
  } catch (e) {
    console.error(e);
  }
};
export const getLes = async (id) => {
  try {
    const les = await db.select(
      `SELECT * FROM les INNER JOIN siswa ON les.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return les;
  } catch (e) {
    console.error(e);
  }
};
export const getLesUN = async (id) => {
  try {
    const les_un = await db.select(
      `SELECT * FROM les_un INNER JOIN siswa ON les_un.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return les_un;
  } catch (e) {
    console.error(e);
  }
};
export const getEkskul = async (id) => {
  try {
    const ekskul = await db.select(
      `SELECT * FROM ekskul INNER JOIN siswa ON ekskul.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return ekskul;
  } catch (e) {
    console.error(e);
  }
};
export const getQurban = async (id) => {
  try {
    const qurban = await db.select(
      `SELECT * FROM qurban INNER JOIN siswa ON qurban.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return qurban;
  } catch (e) {
    console.error(e);
  }
};
export const getBuku = async (id) => {
  try {
    const buku = await db.select(
      `SELECT * FROM buku INNER JOIN siswa ON buku.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return buku;
  } catch (e) {
    console.error(e);
  }
};
export const getPakaian = async (id) => {
  try {
    const pakaian = await db.select(
      `SELECT * FROM pakaian INNER JOIN siswa ON pakaian.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE siswa.id_kelas='` +
        id +
        `' ;`
    );
    return pakaian;
  } catch (e) {
    console.error(e);
  }
};
export const Hello = () => console.log("say hello");
// export default Hello;
// export default CreateUser;

export const test = async (username) => {
  // await load;
  await db.execute(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )`);
};

export default {
  test,
  Hello,
  CreateAllTable,
  makeAdminAccount,
  checkUsername,
  makeDevAccount,
  checkKelas,
  create_kelas,
  getKelas,
  setTypeKelas,
  getKelasByid,
  getSPP,
};
