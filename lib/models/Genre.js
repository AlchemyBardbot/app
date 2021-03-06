const jsonToChat = require('../utils/jsonToChat');
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
        return rows;
    }

    static async getGenres() {
        const { rows } = await pool.query(
            `
    SELECT genre, COUNT(*)
    FROM genres 
    INNER JOIN songs
    ON songs.genre_id = genres.id
    GROUP BY genres.id
            `
        );
        return jsonToChat(rows);
    }
};
