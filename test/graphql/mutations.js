const CREATE_RELEASE = `
  mutation CreateRelease($artist: String!, $title: String!, $date: Date) {
    createRelease(artist: $artist, title: $title, date: $date) {
      id
      artist
      title
      date
    }
  }
`;

const EDIT_RELEASE = `
  mutation EditRelease($id: ID!, $artist: String!, $title: String!, $date: Date) {
    editRelease(id: $id, artist: $artist, title: $title, date: $date) {
      id
      artist
      title
      date
    }
  }
`;

const DELETE_RELEASE = `
  mutation DeleteRelease($id: ID!) {
    deleteRelease(id: $id) {
      id
    }
  }
`;

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
  CREATE_RELEASE,
  EDIT_RELEASE,
  DELETE_RELEASE,
  CREATE_SONG,
  DELETE_SONG,
};
