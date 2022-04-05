const { Pool } = require('pg')
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

require('dotenv').config({ path: "../../.env" })



class userService {
    constructor(){
        this._pool =new Pool({
            connectionString:process.env.DATABASE_URL
        })
    }

    async addNewUser({username,password,nama,role}){
        const id= `user-${nanoid(16)}`
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = {
            text: 'INSERT INTO akun VALUES($1, $2, $3, $4, $5) RETURNING id_akun',
            values: [id, username, hashedPassword, nama,role],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new error('User gagal ditambahkan');
        }

        return result.rows[0].id_akun
    }


    async deleteUser({id}){
        const query = {
            text: 'DELETE FROM akun WHERE id_akun=$1 RETURNING id_akun',
            values: [id],
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new error('ID tidak ditemukan');
        }

        return result.rows[0].id_akun
    }
}


