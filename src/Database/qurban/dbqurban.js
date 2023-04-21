import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");

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
export const getQurbanbyidsiswa = async (id) => {
  try {
    const qurban = await db.select(
      `SELECT * FROM qurban WHERE id_siswa='` + id + `';`
    );
    return qurban;
  } catch (e) {
    console.error(e);
  }
};
export const create_siswa_Qurban = async (jumlah, id_siswa) => {
  try {
    const tanggal = new Date().toLocaleDateString("id");
    await db.execute(
      `INSERT INTO qurban (jumlah,tanggal,id_siswa)
    VALUES(` +
        jumlah +
        `,'` +
        tanggal +
        `','` +
        id_siswa +
        `');`
    );
  } catch (e) {
    console.error(e);
  }
};
export const getQurbanbyidkelas = async (id) => {
  try {
    const qurban = await db.select(
      `SELECT *,qurban.id as id FROM kelas INNER JOIN siswa ON kelas.id = siswa.id_kelas INNER JOIN qurban ON siswa.id = qurban.id_siswa WHERE kelas.id='` +
        id +
        `';`
    );
    return qurban;
  } catch (e) {
    console.error(e);
  }
};
export const editQurban = async (id, jumlah) => {
  try {
    await db.execute(
      `UPDATE qurban SET jumlah = ` + jumlah + ` WHERE id =` + id + `;`
    );
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
