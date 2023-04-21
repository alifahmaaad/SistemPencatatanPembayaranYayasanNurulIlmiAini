import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
import { getSiswabyno_absen } from "../database";
export const getLes = async (id) => {
  try {
    const les = await db.select(
      `SELECT * FROM les INNER JOIN siswa ON les.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE les.id_siswa =` +
        id +
        `;`
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
export const setLesBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE les SET jumlah_terbayar = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editLes = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE les SET jumlah_terhutang = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const getBulanbyIdSiswa = async (id) => {
  try {
    const les = await db.select(
      `SELECT bulan FROM les WHERE id_siswa='` + id + `';`
    );
    return les;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_les_by_id_siswa = async (
  id_siswa,
  bulan,
  dataform
) => {
  const les = dataform.les.replace("Rp.", "");
  const les_without_dot = les.split(".").join("");
  try {
    const isLesAda = await getLesbybulanidsiswa(bulan, id_siswa);
    if (isLesAda.length == 0) {
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
export const delete_les_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM les WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
