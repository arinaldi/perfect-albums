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
  LIMIT_REACHED: 'You have exceeded the limit',
};

const TBD = 'TBD';

const THIRTY_SECONDS = 1000 * 30;
const MAX_REQUEST_COUNT = 3;

module.exports = {
  ERRORS,
  TBD,
  THIRTY_SECONDS,
  MAX_REQUEST_COUNT,
};
