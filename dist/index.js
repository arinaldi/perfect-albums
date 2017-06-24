'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _publicAlbumRoutes = require('./routes/publicAlbumRoutes');

var _publicAlbumRoutes2 = _interopRequireDefault(_publicAlbumRoutes);

var _privateAlbumRoutes = require('./routes/privateAlbumRoutes');

var _privateAlbumRoutes2 = _interopRequireDefault(_privateAlbumRoutes);

var _AuthenticationRoutes = require('./routes/AuthenticationRoutes');

var _AuthenticationRoutes2 = _interopRequireDefault(_AuthenticationRoutes);

var _InstaRoutes = require('./routes/InstaRoutes');

var _InstaRoutes2 = _interopRequireDefault(_InstaRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();


_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(process.env.DATABASE).then(function () {
  return console.log('[mongoose] Connected to MongoDB');
}).catch(function () {
  return console.log('[mongoose] Error connecting to MongoDB');
});

var app = (0, _express2.default)();

app.use(_express2.default.static('public')).use(_bodyParser2.default.json()).use(_publicAlbumRoutes2.default).use(_AuthenticationRoutes2.default).use(_InstaRoutes2.default);

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

var authStrategy = _passport2.default.authenticate('authStrategy', { session: false });
app.use(authStrategy);

app.use(_privateAlbumRoutes2.default);

var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Listening on port:' + port);
});