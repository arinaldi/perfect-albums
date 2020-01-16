const AlbumModel = require('../../db/models/AlbumModel');

module.exports = (queries) => (
  new Promise((resolve, reject) => {
    let { page, per_page: perPage, search } = queries;
    const regex = new RegExp(search, 'i');
    page = (Math.abs(parseInt(page))) - 1;
    perPage = Math.abs(parseInt(perPage)) || 25;

    const query = AlbumModel
      .find({});

    if (search) {
      query.or([{ artist: regex }, { title: regex }]);
    }

    query.countDocuments((_, count) => {
      query
        .sort({ artist: 'asc', title: 'asc' })
        .limit(perPage)
        .skip(perPage * page)
        .exec('find', (err, albums) => {
          if (err) reject(err);
          if (albums) {
            resolve({ count, data: albums });
          } else {
            resolve({ count: 0, data: [] });
          }
        });
    });
  })
);
