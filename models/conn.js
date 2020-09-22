const host = 'lallah.db.elephantsql.com';
const database = 'attwllcb';
const user = 'attwllcb';
const password = 'uGqre5iSe_cpJuWdhBOd5soEn2vZWtpr';




// copy from below

const pgp = require('pg-promise')({
    query: function (event) {
        console.log('QUERY:', event.query);
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password,
}

const db = pgp(options);

module.exports = db;