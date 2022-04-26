/* eslint-disable camelcase */


exports.up = pgm => {
    pgm.createTable('barang', {
        id_barang: {
            type: 'VARCHAR(36)',
            primaryKey: true,
            unique: true
        },
        nama: {
            type: 'VARCHAR(30)',
            notNull: true
        },
        supplier: {
            type: 'VARCHAR(30)',
            notNull: true
        },
        jumlah: {
            type: 'INTEGER',
            notNull: true
        },
        score: {
            type: 'INTEGER',
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('barang');
};
