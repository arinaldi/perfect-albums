const Album = require('../../models/album');

module.exports = (queries) =>
  new Promise((resolve, reject) => {
    let { page, per_page: perPage, search, sort, direction } = queries;
    const regex = new RegExp(search, 'i');
    page = Math.abs(parseInt(page)) - 1;
    perPage = Math.abs(parseInt(perPage)) || 25;
    direction = direction || 'asc';

    const query = Album.find({});

    if (search) {
      query.or([{ artist: regex }, { title: regex }]);
    }

    const sortParams = sort
      ? { [sort]: direction }
      : { artist: 'asc', title: 'asc' };

    if (sort === 'artist') {
      sortParams.title = 'asc';
    } else {
      sortParams.artist = direction;
    }

    query.countDocuments((_, count) => {
      query
        .sort(sortParams)
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
  });
