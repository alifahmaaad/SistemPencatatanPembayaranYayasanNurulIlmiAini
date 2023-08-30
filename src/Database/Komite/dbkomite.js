import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
import { getSiswabyno_absen } from "../database";
export const getKomite = async (id) => {
  try {
    const komite = await db.select(
      `SELECT *,komite.id as id FROM komite INNER JOIN siswa ON komite.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE komite.id_siswa =` +
        id +
        `;`
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
export const setKomiteBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE komite SET jumlah_terbayar = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editKomite = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE komite SET jumlah_terhutang = ` +
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
    const komite = await db.select(
      `SELECT bulan FROM komite WHERE id_siswa='` + id + `';`
    );
    return komite;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_komite_by_id_siswa = async (
  id_siswa,
  bulan,
  dataform
) => {
  const komite = dataform.komite.replace("Rp.", "");
  const komite_without_dot = komite.split(".").join("");
  try {
    const isKomiteAda = await getKomitebybulanidsiswa(bulan, id_siswa);
    if (isKomiteAda.length == 0) {
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
export const delete_komite_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM komite WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
