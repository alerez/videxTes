module.exports = {
  async up(db) {
      // frameColors
      db.collection('frameColors').createIndex({ 'color': 1 }, { unique: true });
      db.collection('frameColors').createIndex({ 'fileURL': 1 }, { unique: true });

      // for frames
      db.collection('frames').createIndex({ 'article': 1 }, { unique: true });
      db.collection('frames').createIndex({ 'productCode': 1 }, { unique: true });
      db.collection('frames').createIndex({ 'fileURL': 1 }, { unique: true });

      // mechanismColors
      db.collection('mechanismColors').createIndex({ 'color': 1 }, { unique: true });
      db.collection('mechanismColors').createIndex({ 'fileURL': 1 }, { unique: true });

      // mechanisms
      db.collection('mechanisms').createIndex({ 'article': 1 }, { unique: true });
      db.collection('mechanisms').createIndex({ 'productCode': 1 }, { unique: true });
      db.collection('mechanisms').createIndex({ 'fileURL': 1 }, { unique: true });
  },

  async down(db, client) {
  }
};
