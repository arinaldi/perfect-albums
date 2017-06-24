'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _AlbumController = require('../controllers/AlbumController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/albums', _AlbumController.list);
router.get('/albums/:id', _AlbumController.show);

exports.default = router;