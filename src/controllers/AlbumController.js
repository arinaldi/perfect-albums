const AlbumModel = require('../models/AlbumModel');

const list = (req, res) => {
  AlbumModel
    .find({})
    .exec()
    .then(albums => res.json(albums));
};

const show = (req, res) => {
  AlbumModel
    .findById(req.params.id)
    .exec()
    .then(item => res.json(item));
};

const create = (req, res) => {
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

const edit = (req, res) => {
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

const remove = (req, res) => {
  AlbumModel.findByIdAndRemove(req.params.id, (err, item) => {
    const response = {
      message: 'Album successfully deleted',
      id: item._id
    };
    res.send(response);
  });
};

module.exports = { list, show, create, edit, remove };
