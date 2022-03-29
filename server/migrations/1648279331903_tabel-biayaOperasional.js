/* eslint-disable camelcase */


exports.up = pgm => {
    pgm.createTable('biaya_operasional',{
        id_biaya:{
            type: 'VARCHAR(36)',
            primaryKey: true
        },
        jenis:{
            type: 'VARCHAR(30)',
            notNull:true
        },        
        total_biaya:{
            type: 'INTEGER',
            notNull:true
        },    
        tanggal_biaya:{
            type: 'DATE',
            notNull:true
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('biaya_operasional');
};
