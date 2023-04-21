import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
import { getSiswabyno_absen } from "../database";
export const getEkskul = async (id) => {
  try {
    const ekskul = await db.select(
      `SELECT *,ekskul.id as id FROM ekskul INNER JOIN siswa ON ekskul.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE ekskul.id_siswa =` +
        id +
        `;`
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
export const setEkskulBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE ekskul SET jumlah_terbayar = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editEkskul = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE ekskul SET jumlah_terhutang = ` +
        jumlah +
        ` WHERE id =` +
        id +
        `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const getBulanbyIdSiswa = async (id) => {
  try {
    const ekskul = await db.select(
      `SELECT bulan FROM ekskul WHERE id_siswa='` + id + `';`
    );
    return ekskul;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_ekskul_by_id_siswa = async (
  id_siswa,
  bulan,
  dataform
) => {
  const ekskul = dataform.ekskul.replace("Rp.", "");
  const ekskul_without_dot = ekskul.split(".").join("");
  try {
    const isEkskulAda = await getEkskulbybulanidsiswa(bulan, id_siswa);
    if (isEkskulAda.length == 0) {
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
export const delete_ekskul_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM ekskul WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
