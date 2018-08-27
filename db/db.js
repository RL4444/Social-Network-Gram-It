const spicedPg = require("spiced-pg");

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres://spicedling:password@localhost:5432/socialnetwork";

var db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:lewis:postgres@localhost:5432/socialnetwork");
}

module.exports.insertUser = function(firstName, lastName, email, password) {
    console.log("it is getting to inserting a user in your db");
    const q = `
        INSERT INTO users (first_name, last_name, email, hashed_password)
            VALUES ($1, $2, $3, $4)
            RETURNING *
    `;
    const params = [
        firstName || null,
        lastName || null,
        email || null,
        password || null
    ];
    return db
        .query(q, params)
        .then(results => {
            console.log(results.rows);
            return results.rows[0];
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

module.exports.editUserPassword = function(
    userId,
    firstName,
    lastName,
    email,
    password
) {
    const q = `
        UPDATE users
        SET first_name = $2, last_name = $3, email = $4, hashed_password = $5
        WHERE id = $1
        RETURNING *
    `;
    const params = [
        userId || null,
        firstName || null,
        lastName || null,
        email || null,
        password || null
    ];
    return db
        .query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.editUserNoPassword = function(id, firstName, lastName, email) {
    const q = `
        UPDATE users
        SET first_name = $2, last_name = $3, email = $4
        WHERE id = $1
        RETURNING *
    `;
    const params = [
        id || null,
        firstName || null,
        lastName || null,
        email || null
    ];
    return db
        .query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.editProfile = function(userId, age, city, url) {
    const q = `
    INSERT INTO profiles (user_id, age, city, url)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (user_id)
    DO UPDATE SET age = $2, city = $3, url = $4
    RETURNING *
    `;
    const params = [
        userId || null,
        parseInt(age) || null,
        city || null,
        url || null
    ];
    console.log(userId, parseInt(age), city, url);
    return db
        .query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

module.exports.getYourUser = function(email) {
    const q = `
        SELECT * FROM users WHERE email = $1
    `;
    const params = [email];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

module.exports.getYourUserInfo = function(userId) {
    const q = `
    SELECT *
    FROM users
    WHERE users.id = $1
    `;
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

module.exports.addImage = function(userId, url) {
    console.log("db userId & url log:", userId, url);
    const q = `
    UPDATE users
    SET profile_pic = $2
    WHERE id = $1
    RETURNING *
    `;
    const params = [userId || null, url || null];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

module.exports.addBio = function(userId, bio) {
    const q = `
    UPDATE users
    SET bio = $2
    WHERE id = $1
    RETURNING *
    `;
    const params = [userId || null, bio || null];
    return db
        .query(q, params)
        .then(results => {
            return results.rows[0];
        })
        .catch(err => {
            // console.log("this is workinggggggggggggggggg");
            return Promise.reject(err);
        });
};

module.exports.insertMediaSpotify = function(userprofile, spotifyurl) {
    const params = [userprofile, spotifyurl];
    const q = `
    INSERT INTO media (userid, spotifyurl)
    VALUES ($1, $2)
    RETURNING *
    `;

    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

module.exports.getMediaById = function(userprofile) {
    const q = `
    SELECT * FROM media WHERE userid = $1 RETURNING *`;
    const params = [userprofile];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

module.exports.endfriendship = function(reciever_id, sender_id) {
    console.log("delete happening in db");
    const params = [reciever_id, sender_id];
    const q = `
        DELETE FROM friendships
        WHERE ((reciever_id = $1 AND sender_id = $2)
        OR (sender_id = $1 AND reciever_id = $2));
        `;
    return db.query(q, params).then(results => {
        console.log("end friendship in delete db: ", results.rows[0]);
        return results.rows[0];
    });
};
module.exports.acceptfriendship = function(reciever_id, sender_id) {
    console.log("accept happening in db");
    const params = [reciever_id, sender_id];
    const q = `
        UPDATE friendships
        SET status = 2
        WHERE ((reciever_id = $1 AND sender_id = $2)
        OR (sender_id = $1 AND reciever_id = $2));
        `;
    return db.query(q, params).then(results => {
        console.log("accept friendship in accept db: ", results.rows[0]);
        return results.rows[0];
    });
};
module.exports.friendshippending = function(reciever_id, sender_id) {
    const params = [reciever_id, sender_id];
    const q = `
        INSERT INTO friendships (reciever_id, sender_id)
        VALUES ($1, $2)
        RETURNING *;
        `;
    return db.query(q, params).then(results => {
        console.log("results.rows[0] in post: ", results.rows[0]);
        return results.rows[0];
    });
};

module.exports.checkFriendship = function(id1, id2) {
    console.log("check friendship input values:", id1, id2);
    const params = [id1, id2];
    const q = `
        SELECT * FROM friendships
        WHERE ((reciever_id = $1 AND sender_id = $2)
        OR (sender_id = $1 AND reciever_id = $2))
        `;
    return db
        .query(q, params)
        .then(results => {
            console.log(
                "info from the check friendship route in db: ",
                results.rows[0]
            );
            return results.rows[0];
        })
        .catch(err => {
            return err;
        });
};

module.exports.friendsAndWannabes = function(userId) {
    const params = [userId];
    const q = `
           SELECT users.id, first_name, last_name, profile_pic, status
           FROM friendships
           JOIN users
           ON (status = 1 AND reciever_id = $1 AND sender_id = users.id)
           OR (status = 2 AND reciever_id = $1 AND sender_id = users.id)
           OR (status = 2 AND sender_id = $1 AND reciever_id = users.id);
       `;
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.getAllUsers = function(ids) {
    const params = [ids];
    const q = `SELECT * FROM users WHERE id = ANY($1)`;
    return db.query(q, params).then(results => {
        // console.log("results.rows in accept db: ", results.rows);
        return results.rows;
    });
};

// db query for checking friendships
// SELECT * FROM friendships
// WHERE ((sender_id = $1 AND receiver_id =$2)
// OR (sender_id = $2 AND receiver_id = $1))
