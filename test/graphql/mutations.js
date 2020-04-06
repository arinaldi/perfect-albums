const CREATE_SONG = `
  mutation CreateSong($artist: String!, $title: String!, $link: String!) {
    createSong(artist: $artist, title: $title, link: $link) {
      id
      artist
      title
      link
    }
}
`;

const DELETE_SONG = `
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

module.exports = {
  CREATE_SONG,
  DELETE_SONG,
};
