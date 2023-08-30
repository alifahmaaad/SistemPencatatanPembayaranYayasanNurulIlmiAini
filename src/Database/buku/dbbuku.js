import Database from "tauri-plugin-sql-api";
import { getSiswabyno_absen } from "../database";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
export const getBuku = async (id) => {
  try {
    const buku = await db.select(
      `SELECT * FROM buku INNER JOIN siswa ON buku.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE buku.id_siswa ='` +
        id +
        `';`
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
export const getbukubyidkelas = async (id) => {
  try {
    const buku = await db.select(
      `SELECT *,buku.id as id FROM kelas INNER JOIN siswa ON kelas.id = siswa.id_kelas INNER JOIN buku ON siswa.id = buku.id_siswa WHERE kelas.id='` +
        id +
        `';`
    );
    return buku;
  } catch (e) {
    console.error(e);
  }
};
export const setbukuBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE buku SET jumlah_terbayar = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editbuku = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE buku SET jumlah_terhutang = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};

export const delete_buku_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM buku WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
