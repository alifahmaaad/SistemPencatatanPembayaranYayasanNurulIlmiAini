import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
import { getSiswabyno_absen } from "../database";
export const getLesUN = async (id) => {
  try {
    const les_un = await db.select(
      `SELECT *,les_un.id as id FROM les_un INNER JOIN siswa ON les_un.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE les_un.id_siswa =` +
        id +
        `;`
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
export const setLes_unBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE les_un SET jumlah_terbayar = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editLes_un = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE les_un SET jumlah_terhutang = ` +
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
    const les_un = await db.select(
      `SELECT bulan FROM les_un WHERE id_siswa='` + id + `';`
    );
    return les_un;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_lesun_by_id_siswa = async (
  id_siswa,
  bulan,
  dataform
) => {
  const les_un = dataform.les_un.replace("Rp.", "");
  const les_without_dot = les_un.split(".").join("");
  try {
    const islesunAda = await getLesUNbybulanidsiswa(bulan, id_siswa);
    if (islesunAda.length == 0) {
      await db.execute(
        `INSERT INTO les_un (bulan,jumlah_terbayar,jumlah_terhutang,id_siswa)
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
export const delete_les_un_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM les_un WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
