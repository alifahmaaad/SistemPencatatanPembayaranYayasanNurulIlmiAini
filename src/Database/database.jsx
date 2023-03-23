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
  jumlah INTEGER NOT NULL,
  tanggal TEXT NOT NULL,
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
export const getSpp = async (id) => {
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
export const getSPPbybulanidsiswa = async (bulan, id) => {
  try {
    const spp = await db.select(
      `SELECT * FROM spp WHERE id_siswa='` + id + `' AND bulan='` + bulan + `';`
    );
    return spp;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_spp = async (id_kelas, bulan, dataform) => {
  const spp = dataform.spp.replace("Rp.", "");
  const spp_without_dot = spp.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const isSppAda = await getSPPbybulanidsiswa(bulan, id_siswa);
    if (siswa.length > 0 && isSppAda.length == 0) {
      await db.execute(
        `INSERT INTO spp (bulan,jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES('` +
          bulan +
          `',` +
          0 +
          `,` +
          spp_without_dot +
          `,'` +
          id_siswa +
          `');`
      );
    } else {
      return true;
    }
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
export const getKomitebybulanidsiswa = async (bulan, id) => {
  try {
    const komite = await db.select(
      `SELECT * FROM komite WHERE id_siswa='` +
        id +
        `' AND bulan='` +
        bulan +
        `';`
    );
    return komite;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_komite = async (id_kelas, bulan, dataform) => {
  const komite = dataform.komite.replace("Rp.", "");
  const komite_without_dot = komite.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const isKomiteAda = await getKomitebybulanidsiswa(bulan, id_siswa);
    if (siswa.length > 0 && isKomiteAda.length == 0) {
      await db.execute(
        `INSERT INTO komite (bulan,jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES('` +
          bulan +
          `',` +
          0 +
          `,` +
          komite_without_dot +
          `,'` +
          id_siswa +
          `');`
      );
    } else {
      return true;
    }
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
export const getPendaftaranbyidsiswa = async (id) => {
  try {
    const pendaftaran = await db.select(
      `SELECT * FROM pendaftaran WHERE id_siswa='` + id + `';`
    );
    return pendaftaran;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_Pendaftaran = async (id_kelas, dataform) => {
  const pendaftaran = dataform.pendaftaran.replace("Rp.", "");
  const pendaftaran_without_dot = pendaftaran.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const isPendaftaranAda = await getPendaftaranbyidsiswa(id_siswa);
    if (siswa.length > 0 && isPendaftaranAda.length == 0) {
      await db.execute(
        `INSERT INTO pendaftaran (jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES(0,` +
          pendaftaran_without_dot +
          `,'` +
          id_siswa +
          `');`
      );
    } else {
      return true;
    }
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
export const getPendaftaran_ulangbyidsiswa = async (id) => {
  try {
    const pendaftaran_ulang = await db.select(
      `SELECT * FROM pendaftaran_ulang WHERE id_siswa='` + id + `';`
    );
    return pendaftaran_ulang;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_Pendaftaran_ulang = async (id_kelas, dataform) => {
  const pendaftaran_ulang = dataform.pendaftaran_ulang.replace("Rp.", "");
  const pendaftaran_ulang_without_dot = pendaftaran_ulang.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const isPendaftaran_ulangAda = await getPendaftaran_ulangbyidsiswa(
      id_siswa
    );
    if (siswa.length > 0 && isPendaftaran_ulangAda.length == 0) {
      await db.execute(
        `INSERT INTO pendaftaran_ulang (jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES(0,` +
          pendaftaran_ulang_without_dot +
          `,'` +
          id_siswa +
          `');`
      );
    } else {
      return true;
    }
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
export const getLesbybulanidsiswa = async (bulan, id) => {
  try {
    const les = await db.select(
      `SELECT * FROM les WHERE id_siswa='` + id + `' AND bulan='` + bulan + `';`
    );
    return les;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_les = async (id_kelas, bulan, dataform) => {
  const les = dataform.les.replace("Rp.", "");
  const les_without_dot = les.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const isLesAda = await getLesbybulanidsiswa(bulan, id_siswa);
    if (siswa.length > 0 && isLesAda.length == 0) {
      await db.execute(
        `INSERT INTO les (bulan,jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES('` +
          bulan +
          `',` +
          0 +
          `,` +
          les_without_dot +
          `,'` +
          id_siswa +
          `');`
      );
    } else {
      return true;
    }
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
export const getLesUNbybulanidsiswa = async (bulan, id) => {
  try {
    const lesun = await db.select(
      `SELECT * FROM les_un WHERE id_siswa='` +
        id +
        `' AND bulan='` +
        bulan +
        `';`
    );
    return lesun;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_lesUN = async (id_kelas, bulan, dataform) => {
  const lesun = dataform.lesun.replace("Rp.", "");
  const lesun_without_dot = lesun.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const isLesUNAda = await getLesUNbybulanidsiswa(bulan, id_siswa);
    if (siswa.length > 0 && isLesUNAda.length == 0) {
      await db.execute(
        `INSERT INTO les_un (bulan,jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES('` +
          bulan +
          `',` +
          0 +
          `,` +
          lesun_without_dot +
          `,'` +
          id_siswa +
          `');`
      );
    } else {
      return true;
    }
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
export const getEkskulbybulanidsiswa = async (bulan, id) => {
  try {
    const ekskul = await db.select(
      `SELECT * FROM ekskul WHERE id_siswa='` +
        id +
        `' AND bulan='` +
        bulan +
        `';`
    );
    return ekskul;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_ekskul = async (id_kelas, bulan, dataform) => {
  const ekskul = dataform.ekskul.replace("Rp.", "");
  const ekskul_without_dot = ekskul.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const isEkskulAda = await getEkskulbybulanidsiswa(bulan, id_siswa);
    if (siswa.length > 0 && isEkskulAda.length == 0) {
      await db.execute(
        `INSERT INTO ekskul (bulan,jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES('` +
          bulan +
          `',` +
          0 +
          `,` +
          ekskul_without_dot +
          `,'` +
          id_siswa +
          `');`
      );
    } else {
      return true;
    }
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
export const getbukubyidsiswa = async (id) => {
  try {
    const buku = await db.select(
      `SELECT * FROM buku WHERE id_siswa='` + id + `';`
    );
    return buku;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_buku = async (id_kelas, dataform) => {
  const buku = dataform.buku.replace("Rp.", "");
  const buku_without_dot = buku.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const isbukuAda = await getbukubyidsiswa(id_siswa);
    if (siswa.length > 0 && isbukuAda.length == 0) {
      await db.execute(
        `INSERT INTO buku (jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES(0,` +
          buku_without_dot +
          `,'` +
          id_siswa +
          `');`
      );
    } else {
      return true;
    }
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
export const getpakaianbyidsiswa = async (id) => {
  try {
    const pakaian = await db.select(
      `SELECT * FROM pakaian WHERE id_siswa='` + id + `';`
    );
    return pakaian;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_pakaian = async (id_kelas, dataform) => {
  const pakaian = dataform.pakaian.replace("Rp.", "");
  const pakaian_without_dot = pakaian.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const ispakaianAda = await getpakaianbyidsiswa(id_siswa);
    if (siswa.length > 0 && ispakaianAda.length == 0) {
      await db.execute(
        `INSERT INTO pakaian (jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES(0,` +
          pakaian_without_dot +
          `,'` +
          id_siswa +
          `');`
      );
    } else {
      return true;
    }
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
  CreateAllTable,
  makeAdminAccount,
  makeDevAccount,
};
