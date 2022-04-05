/* eslint-disable camelcase */


exports.up = pgm => {
    pgm.createTable('akun',{
        id_akun:{
            type: 'VARCHAR(36)',
            primaryKey: true
        },
        username:{
            type: 'VARCHAR(30)',
            notNull:true
        },        
        password:{
            type: 'TEXT',
            notNull:true
        },
        nama:{
            type: 'VARCHAR(30)',
            notNull:true
        },
        role:{
            type: 'VARCHAR(30)',
            notNull:true
        },
        
    })
};

exports.down = pgm => {
    pgm.dropTable('akun');
};
