"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
  artist: {
    required: true,
    type: String
  },
  album: {
    required: true,
    type: String
  },
  cd: {
    required: true,
    type: Boolean
  },
  aotd: {
    required: true,
    type: Boolean
  }
});

exports.default = _mongoose2.default.model("Album", schema);