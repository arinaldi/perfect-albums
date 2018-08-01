import AlbumModel from '../models/AlbumModel';

export const list = (req, res) => {
  AlbumModel
    .find({})
    .exec()
    .then(albums => res.json(albums));
};

export const show = (req, res) => {
  AlbumModel
    .findById(req.params.id)
    .exec()
    .then(item => res.json(item));
};

export const create = (req, res) => {
  const { artist, album, cd, aotd } = req.body;
  const item = new AlbumModel({
    artist,
    album,
    cd,
    aotd
  });

  item
    .save()
    .then(newAlbum => res.json(newAlbum));
};

export const edit = (req, res) => {
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
};

export const remove = (req, res) => {
  AlbumModel.findByIdAndRemove(req.params.id, (err, item) => {
    const response = {
      message: 'Album successfully deleted',
      id: item._id
    };
    res.send(response);
  });
};
