const GET_HEALTH = `
  {
    health
  }
`;

const GET_FAVORITES = `
  {
    favorites {
      artist
      title
      year
    }
  }
`;

const GET_SONGS = `
  {
    songs {
      id
      artist
      title
      link
    }
  }
`;

module.exports = {
  GET_HEALTH,
  GET_FAVORITES,
  GET_SONGS,
};
