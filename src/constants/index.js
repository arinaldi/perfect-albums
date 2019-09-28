const ERRORS = {
  ALBUM: 'Album not found',
  GENERIC: 'Something went wrong',
  RELEASE: 'Release not found',
  SONG: 'Song not found',
  TOKEN: 'Error decoding token',
  USER: {
    CREDENTIALS: 'You must provide an username and password',
    NOT_FOUND: 'User not found',
    NOT_VALID: 'User not valid',
    TAKEN: 'Username is in use',
  },
};

const TBD = 'TBD';

const ONE_WEEK = 60 * 60 * 24 * 7;

module.exports = {
  ERRORS,
  TBD,
  ONE_WEEK,
};
