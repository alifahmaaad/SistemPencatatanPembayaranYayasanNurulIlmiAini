import Database from "tauri-plugin-sql-api";
const db = await Database.load("sqlite:Sistem Keuangan Nurul Ilmi Aini.db");
export const getLaporanHarian = async (id, tanggal) => {
  try {
    const data_tanggal = tanggal.$D + "/" + (tanggal.$M + 1) + "/" + tanggal.$y;
    const history_bayar = await db.select(
      `SELECT *,history_bayar.id as id FROM kelas INNER JOIN siswa ON kelas.id = siswa.id_kelas INNER JOIN history_bayar ON siswa.id = history_bayar.id_siswa WHERE kelas.id='` +
        id +
        `' AND created_at='` +
        data_tanggal +
        `';`
    );
    return history_bayar;
  } catch (e) {
    console.error(e);
  }
};
