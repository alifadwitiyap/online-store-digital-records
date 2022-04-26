/* eslint-disable camelcase */


exports.up = pgm => {
    pgm.createTable('penjualan_barang', {
        id_penjualan: {
            type: 'VARCHAR(36)',
            primaryKey: true
        },
        id_barang: {
            type: 'VARCHAR(30)',
            references: 'barang',
            onDelete: 'cascade',
            notNull: true
        },
        harga_jual: {
            type: 'INTEGER',
            notNull: true
        },
        jumlah_dijual: {
            type: 'INTEGER',
            notNull: true
        },
        tanggal_jual: {
            type: 'DATE',
            notNull: true
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('penjualan_barang');
};
