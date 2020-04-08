const { expect } = require('chai');

const { gqlCall } = require('../utils');
const {
  favoriteAlbums,
  featuredSongs,
  releases: newReleases,
} = require('../data');
const {
  GET_HEALTH,
  GET_FAVORITES,
  GET_RELEASES,
  GET_SONGS,
} = require('../graphql/queries');

describe('Health query', () => {
  it('returns OK', async () => {
    const response = await gqlCall({ source: GET_HEALTH });

    expect(response).to.eql({
      data: {
        health: 'OK',
      },
    });
  });
});

describe('Favorites query', () => {
  it('returns an array of favorite albums', async () => {
    const response = await gqlCall({ source: GET_FAVORITES });

    expect(response.data.favorites).to.have.deep.members(favoriteAlbums);
  });
});

describe('Featured Songs query', () => {
  it('returns an array of featured songs', async () => {
    const response = await gqlCall({ source: GET_SONGS });
    const songs = response.data.songs.map(({ artist, title, link }) => ({
      artist,
      title,
      link,
    }));

    expect(songs).to.have.deep.members(featuredSongs);
  });
});

describe('New Releases query', () => {
  it('returns an array of new releases', async () => {
    const response = await gqlCall({ source: GET_RELEASES });
    const releases = response.data.releases.map(({ artist, title, date }) => ({
      artist,
      title,
      date: date.toISOString(),
    }));

    expect(releases).to.have.deep.members(newReleases);
  });
});
