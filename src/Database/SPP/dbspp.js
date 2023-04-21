import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
import { getSiswabyno_absen } from "../database";
export const getSpp = async (id) => {
  try {
    const spp = await db.select(
      `SELECT *,spp.id as id  FROM spp INNER JOIN siswa ON spp.id_siswa = siswa.id INNER JOIN kelas ON siswa.id_kelas = kelas.id WHERE spp.id_siswa =` +
        id +
        `;`
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
export const setSPPBayar = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE spp SET jumlah_terbayar = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const editSPP = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE spp SET jumlah_terhutang = ` + jumlah + ` WHERE id =` + id + `;`
    );
  } catch (e) {
    console.error(e);
  }
};
export const getBulanbyIdSiswa = async (id) => {
  try {
    const spp = await db.select(
      `SELECT bulan FROM spp WHERE id_siswa='` + id + `';`
    );
    return spp;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_spp_by_id_siswa = async (
  id_siswa,
  bulan,
  dataform
) => {
  const spp = dataform.spp.replace("Rp.", "");
  const spp_without_dot = spp.split(".").join("");
  try {
    const isSppAda = await getSPPbybulanidsiswa(bulan, id_siswa);
    console.log(isSppAda);
    if (isSppAda.length == 0) {
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
export const delete_spp_siswa_by_id = async (id) => {
  try {
    const id_with_sym = id.map((i) => `'${i}'`);
    await db.execute(`DELETE FROM spp WHERE id IN (` + id_with_sym + `);`);
  } catch (e) {
    console.error(e);
  }
};
