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
  INVALID_DATE: 'Date is invalid',
};

const TBD = 'TBD';

module.exports = {
  ERRORS,
  TBD,
};
