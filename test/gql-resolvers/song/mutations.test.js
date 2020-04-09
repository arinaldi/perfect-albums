const { expect } = require('chai');

const { ERRORS } = require('../../../src/constants');
const { gqlCall } = require('../../utils');
const { invalidId } = require('../../data');
const {
  CREATE_SONG,
  DELETE_SONG,
} = require('../../graphql/mutations');

let newId;

describe('Create Featured Song mutation', () => {
  const data = {
    artist: 'Smashing Pumpkins',
    title: 'Zero',
    link: 'google.com',
  };

  it('does not create a featured song if not authorized', async () => {
    const response = await gqlCall({
      source: CREATE_SONG,
      variableValues: data,
      isAuthorized: false,
    });

    expect(response.errors[0].message).to.equal(ERRORS.USER.NOT_VALID);
  });

  it('creates a featured song and returns it', async () => {
    const response = await gqlCall({
      source: CREATE_SONG,
      variableValues: data,
      isAuthorized: true,
    });
    const { id, ...song } = response.data.createSong;
    newId = id;

    expect(song).to.eql({
      artist: data.artist,
      title: data.title,
      link: data.link,
    });
  });

  it('does not create a featured song without a required field', async () => {
    delete data.artist;
    const error = `Variable \"$artist\" of required type \"String!\" was not provided.`;

    const response = await gqlCall({
      source: CREATE_SONG,
      variableValues: data,
      isAuthorized: true,
    });

    expect(response.errors[0].message).to.equal(error);
  });
});

describe('Delete Featured Song mutation', () => {
  it('does not delete a featured song if not authorized', async () => {
    const response = await gqlCall({
      source: DELETE_SONG,
      variableValues: { id: newId },
      isAuthorized: false,
    });

    expect(response.errors[0].message).to.equal(ERRORS.USER.NOT_VALID);
  });

  it('deletes a featured song and returns the ID', async () => {
    const response = await gqlCall({
      source: DELETE_SONG,
      variableValues: { id: newId },
      isAuthorized: true,
    });

    expect(response).to.eql({
      data: {
        deleteSong: { id: newId },
      },
    });
  });

  it('does not delete a featured song with an invalid ID', async () => {
    const response = await gqlCall({
      source: DELETE_SONG,
      variableValues: { id: invalidId },
      isAuthorized: true,
    });

    expect(response.errors[0].message).to.equal(ERRORS.SONG);
  });
});
