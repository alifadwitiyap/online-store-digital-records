/* eslint-disable camelcase */


exports.up = pgm => {
    pgm.createTable('pembelian_barang',{
        id_pembelian:{
            type: 'VARCHAR(36)',
            primaryKey: true
        },
        id_barang:{
            type: 'VARCHAR(30)',
            references: 'barang',
            onDelete: 'cascade',
            notNull:true
        },        
        harga_beli:{
            type: 'INTEGER',
            notNull:true
        },
        jumlah_dibeli:{
            type: 'INTEGER',
            notNull:true
        },
        tanggal_beli:{
            type: 'DATE',
            notNull:true
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('pembelian_barang');
};
