import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
import { getSiswabyno_absen } from "../database";
export const getPendaftaranUlang = async (id) => {
  try {
    const pendaftaran_ulang = await db.select(
      `SELECT * FROM pendaftaran_ulang INNER JOIN siswa ON pendaftaran_ulang.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE pendaftaran_ulang.id_siswa =` +
        id +
        `;`
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
export const getPendaftaran_ulangbyidkelas = async (id) => {
  try {
    const pendaftaran = await db.select(
      `SELECT *,pendaftaran_ulang.id as id FROM kelas INNER JOIN siswa ON kelas.id = siswa.id_kelas INNER JOIN pendaftaran_ulang ON siswa.id = pendaftaran_ulang.id_siswa WHERE kelas.id='` +
        id +
        `';`
    );
    return pendaftaran;
  } catch (e) {
    console.error(e);
  }
};
export const setPendaftaran_ulangBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE pendaftaran_ulang SET jumlah_terbayar = ` +
        jumlah +
        ` WHERE id =` +
        id +
        `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editPendaftaran_ulang = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE pendaftaran_ulang SET jumlah_terhutang = ` +
        jumlah +
        ` WHERE id =` +
        id +
        `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const delete_pendaftaran_ulang_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(
      `DELETE FROM pendaftaran_ulang WHERE id IN (` + id_with_sym + `);`
    );
  } catch (e) {
    console.error(e);
  }
};
