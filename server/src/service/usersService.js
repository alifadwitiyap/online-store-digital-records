const { Pool } = require('pg')
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const errorResponse = require('../util/errorResponse');
const jwt = require('jsonwebtoken');
const NodeCache = require("node-cache");

class usersService {

    static token = new NodeCache();

    constructor() {
        this._pool = new Pool({
            connectionString: process.env.DATABASE_URL
        })
    }

    async registerUser({ username, password, nama, role }) {
        const id = `user-${nanoid(16)}`
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: 'INSERT INTO akun VALUES($1, $2, $3, $4, $5) RETURNING *',
            values: [id, username, hashedPassword, nama, role],
        };

        const result = await this._pool.query(query);

        const data = result.rows[0]
        delete data.password

        return data
    }


    async deleteUser({ id }) {
        const query = {
            text: 'DELETE FROM akun WHERE id_akun=$1 RETURNING id_akun',
            values: [id],
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new errorResponse('ID tidak ditemukan', 404);
        }
    }

    async loginUser({ username, password }) {
        if (!username || !password) {
            throw new errorResponse('Username atau password kosong', 400)
        }

        const query = {
            text: 'SELECT * from akun  where username=$1',
            values: [username],
        };
        const result = await this._pool.query(query);

        if (result.rows < 1) {
            throw new errorResponse('Username tidak ditemukan', 404)
        }

        const data = result.rows[0];
        const isMatch = await bcrypt.compare(password, data.password);
        delete data.password

        if (!isMatch) {
            throw new errorResponse('Invalid credential', 401)
        }

        data.token = await jwt.sign({ "id_akun": data.id_akun }, process.env.JWT_SECRET_KEY)
        usersService.token.set(data.token, true, 60 * 60)

        return data
    }


    async logoutUser({ authorization }) {
        usersService.token.del(authorization.split(' ')[1])
    }
}


module.exports = usersService

