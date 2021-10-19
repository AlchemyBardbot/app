const pool = require('../utils/pool');

module.exports = class Genre {
  id;
  genre;

  constructor(row) {
    this.id = row.id;
    this.genre = row.genre;
  }

  static async getPlaylist(userInput) {
    const { rows } = await pool.query(
      `
    SELECT title, url, genre
    FROM genres
    INNER JOIN songs
    ON songs.genre_id = genres.id
    WHERE genre = $1`,
      [userInput]
    );
    console.log(rows);
    return rows;
  }
};
