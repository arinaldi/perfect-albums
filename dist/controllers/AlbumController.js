"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = list;
exports.show = show;
exports.edit = edit;

var _AlbumModel = require("../models/AlbumModel");

var _AlbumModel2 = _interopRequireDefault(_AlbumModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function list(req, res) {
  _AlbumModel2.default.find({}).exec().then(function (albums) {
    return res.json(albums);
  });
}

function show(req, res) {
  _AlbumModel2.default.findById(req.params.id).exec().then(function (item) {
    return res.json(item);
  });
}

// export function create(req, res) {
//   const { artist, album, year, genre, length } = req.body;
//   const item = new AlbumModel({
//     artist,
//     album,
//     year,
//     genre,
//     length
//   });
//   item.save()
//     .then(newAlbum => {
//       return res.json(newAlbum);
//     });
// }

function edit(req, res) {
  var _req$body = req.body,
      artist = _req$body.artist,
      album = _req$body.album,
      cd = _req$body.cd,
      aotd = _req$body.aotd;

  var item = {
    artist: artist,
    album: album,
    cd: cd,
    aotd: aotd
  };
  _AlbumModel2.default.findByIdAndUpdate(req.params.id, item, function (err, item) {
    var response = {
      message: "Album successfully updated",
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