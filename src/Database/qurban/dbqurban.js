import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
import { getSiswabyno_absen } from "../database";
export const getQurban = async (id) => {
  try {
    const qurban = await db.select(
      `SELECT *,qurban.id as id FROM qurban INNER JOIN siswa ON qurban.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE qurban.id_siswa =` +
        id +
        `;`
    );
    return qurban;
  } catch (e) {
    console.error(e);
  }
};
export const getQurbanbybulanidsiswa = async (bulan, id) => {
  try {
    const qurban = await db.select(
      `SELECT * FROM qurban WHERE id_siswa='` +
        id +
        `' AND bulan='` +
        bulan +
        `';`
    );
    return qurban;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_qurban = async (id_kelas, bulan, dataform) => {
  console.log(dataform.qurban);
  const qurban = dataform.qurban.replace("Rp.", "");
  console.log(qurban);
  const qurban_without_dot = qurban.split(".").join("");
  const nisn_atau_absen = dataform.nisn_no_absen;
  try {
    const siswa = await getSiswabyno_absen(id_kelas, nisn_atau_absen);
    const id_siswa = siswa[0].id;
    const isQurbanAda = await getQurbanbybulanidsiswa(bulan, id_siswa);
    if (siswa.length > 0 && isQurbanAda.length == 0) {
      await db.execute(
        `INSERT INTO qurban (bulan,jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES('` +
          bulan +
          `',` +
          0 +
          `,` +
          qurban_without_dot +
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
export const setQurbanBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE qurban SET jumlah_terbayar = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editQurban = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE qurban SET jumlah_terhutang = ` +
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
    const qurban = await db.select(
      `SELECT bulan FROM qurban WHERE id_siswa='` + id + `';`
    );
    return qurban;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_qurban_by_id_siswa = async (
  id_siswa,
  bulan,
  dataform
) => {
  const qurban = dataform.qurban.replace("Rp.", "");
  const qurban_without_dot = qurban.split(".").join("");
  try {
    const isQurbanAda = await getQurbanbybulanidsiswa(bulan, id_siswa);
    if (isQurbanAda.length == 0) {
      await db.execute(
        `INSERT INTO qurban (bulan,jumlah_terbayar,jumlah_terhutang,id_siswa)
    VALUES('` +
          bulan +
          `',` +
          0 +
          `,` +
          qurban_without_dot +
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
export const delete_qurban_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM qurban WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
