import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
import { getSiswabyno_absen } from "../database";
export const getPakaian = async (id) => {
  try {
    const pakaian = await db.select(
      `SELECT * FROM pakaian INNER JOIN siswa ON pakaian.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE pakaian.id_siswa ='` +
        id +
        `';`
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
export const getpakaianbyidkelas = async (id) => {
  try {
    const pakaian = await db.select(
      `SELECT *,pakaian.id as id FROM kelas INNER JOIN siswa ON kelas.id = siswa.id_kelas INNER JOIN pakaian ON siswa.id = pakaian.id_siswa WHERE kelas.id='` +
        id +
        `';`
    );
    return pakaian;
  } catch (e) {
    console.error(e);
  }
};
export const setpakaianBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE pakaian SET jumlah_terbayar = ` +
        jumlah +
        ` WHERE id =` +
        id +
        `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editpakaian = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE pakaian SET jumlah_terhutang = ` +
        jumlah +
        ` WHERE id =` +
        id +
        `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const delete_pakaian_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM pakaian WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
