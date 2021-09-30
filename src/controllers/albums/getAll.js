const Album = require('../../models/album');

module.exports = (queries) =>
  new Promise((resolve, reject) => {
    let {
      artist,
      direction,
      page,
      per_page: perPage,
      sort,
      studio,
      title,
    } = queries;
    const artistRegex = new RegExp(artist, 'i');
    const titleRegex = new RegExp(title, 'i');
    direction = direction || 'asc';
    page = Math.abs(parseInt(page)) - 1;
    perPage = Math.abs(parseInt(perPage)) || 25;
    studio = studio || '';

    const query = Album.find({});

    if (artist) {
      query.find({ artist: artistRegex });
    }

    if (title) {
      query.find({ title: titleRegex });
    }

    if (studio === 'true') {
      query.find({ studio: true });
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
