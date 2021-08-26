const supabase = require('../utils/supabase');

async function decodeSupabaseToken(token) {
  try {
    const { error, user } = await supabase.auth.api.getUser(token);

    if (error) throw error;

    return user;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(err.error_description || err.message);
    }
    return null;
  }
}

function getRandomInt(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);

  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
}

function getToken(authHeader = '') {
  const headers = authHeader.split(' ');
  const tokenIndex = headers.indexOf('Bearer');
  return tokenIndex === -1 ? '' : headers[tokenIndex + 1];
}

const sortByAlbum = (a, b) => {
  if (a.artist < b.artist) return -1;
  if (a.artist > b.artist) return 1;
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  return 0;
};

module.exports = { decodeSupabaseToken, getRandomInt, getToken, sortByAlbum };
