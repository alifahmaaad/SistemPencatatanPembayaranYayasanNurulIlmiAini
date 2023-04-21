import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
import { getSiswabyno_absen } from "../database";
export const getPendaftaran = async (id) => {
  try {
    const pendaftaran = await db.select(
      `SELECT *,pendaftaran.id as id FROM pendaftaran INNER JOIN siswa ON pendaftaran.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE pendaftaran.id_siswa =` +
        id +
        `;`
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
export const getPendaftaranbyidkelas = async (id) => {
  try {
    const pendaftaran = await db.select(
      `SELECT *,pendaftaran.id as id FROM kelas INNER JOIN siswa ON kelas.id = siswa.id_kelas INNER JOIN pendaftaran ON siswa.id = pendaftaran.id_siswa WHERE kelas.id='` +
        id +
        `';`
    );
    return pendaftaran;
  } catch (e) {
    console.error(e);
  }
};
export const setPendaftaranBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE pendaftaran SET jumlah_terbayar = ` +
        jumlah +
        ` WHERE id =` +
        id +
        `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editPendaftaran = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE pendaftaran SET jumlah_terhutang = ` +
        jumlah +
        ` WHERE id =` +
        id +
        `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const delete_pendaftaran_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(
      `DELETE FROM pendaftaran WHERE id IN (` + id_with_sym + `);`
    );
  } catch (e) {
    console.error(e);
  }
};
