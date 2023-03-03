const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DATABASE_PATH);

// Default functions
module.exports.init_db = () => {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS stats(endpoint TEXT, method TEXT, uses INTEGER)");
        db.run("CREATE TABLE IF NOT EXISTS notes(text TEXT)");
    });
}

module.exports.close_db = () => {
    db.close();
}

// Functions for managing database with ease

// Notes part
module.exports.get_notes = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT rowid AS id, text FROM notes", (err, notes) => {
            if (err) reject(err);
            resolve(notes);
        });
    });
}

module.exports.get_note = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT rowid AS id, text FROM notes WHERE id = ${id}`, (err, note) => {
            if (err) reject(err);
            resolve(note);
        });
    });
}

module.exports.add_note = (note_text) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const stmt = db.prepare("INSERT INTO notes(text) VALUES (?)");
            stmt.run(note_text, function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
            stmt.finalize();
        });
    })
}

module.exports.update_note = (id, note_text) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE notes SET text = "${note_text}" WHERE rowid = ${id}`, (err) => {
            if (err) reject(err);
            resolve(true);
        });
    })
}

// Stats part

// Yep, I know, that this code is messy and all, but I do not know
//   how to check for existing / change the behaiviour of sqlite 
//   if row persists in db or not. Usually it is made by adapter
//   and not by back-end app. SQLite3 is lightweight database "clone"
//   so don't blame me for this function, I think it has to be done.
async function stat_persists(endpoint, method) {
    let result = await new Promise((resolve, reject) => {
        db.each(`SELECT * FROM stats WHERE endpoint = "${endpoint}" AND method = "${method}"
            UNION ALL
            SELECT NULL, NULL, NULL
            LIMIT 1;`, (err, row) => {
            if (row.endpoint == null) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
    return result;
}

module.exports.increase_stat = async (endpoint, method) => {
    return new Promise((resolve, _reject) => {
        stat_persists(endpoint, method)
            .then(() => {
                db.run(`UPDATE stats SET uses = uses + 1 WHERE endpoint = "${endpoint}" AND method = "${method}"`);
                resolve("Stat updated!");
            })
            .catch(() => {
                db.serialize(() => {
                    const stmt = db.prepare("INSERT INTO stats(endpoint, method, uses) VALUES (?, ?, ?)");
                    stmt.run([endpoint, method, 1]);
                    stmt.finalize();
                });
                resolve("Stat created!");
            });
    });
}

module.exports.get_stats = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT rowid AS id, endpoint, method, uses FROM stats", (err, stats) => {
            if (err) reject(err);
            resolve(stats);
        });
    });
}
