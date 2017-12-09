import AlbumModel from '../models/AlbumModel';

export function list(req, res) {
  AlbumModel.find({}).exec()
    .then(albums => {
      return res.json(albums);
    });
}

export function show(req, res) {
  AlbumModel.findById(req.params.id).exec()
    .then(item => {
      return res.json(item);
    });
}

export function create(req, res) {
  const { artist, album, cd, aotd } = req.body;
  const item = new AlbumModel({
    artist,
    album,
    cd,
    aotd
  });
  item.save()
    .then(newAlbum => {
      return res.json(newAlbum);
    });
}

export function edit(req, res) {
  const { artist, album, cd, aotd } = req.body;
  const updatedAlbum = {
    artist,
    album,
    cd,
    aotd
  };
  AlbumModel.findByIdAndUpdate(req.params.id, updatedAlbum, (err, item) => {
    const response = {
      message: 'Album successfully updated',
      id: item._id
    };
    res.send(response);
  });
}

// export function remove(req, res) {
//   AlbumModel.findByIdAndRemove(req.params.id, (err, item) => {
//     const response = {
//       message: "Album successfully deleted",
//       id: item._id
//     };
//     res.send(response);
//   });
// }
