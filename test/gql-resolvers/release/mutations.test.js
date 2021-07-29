const { expect } = require('chai');

const { ERRORS } = require('../../../src/constants');
const { gqlCall } = require('../../utils');
const { invalidId } = require('../../data');
const {
  CREATE_RELEASE,
  EDIT_RELEASE,
  DELETE_RELEASE,
} = require('../../graphql/mutations');

let newId;

describe('Create New Release mutation', () => {
  const data = {
    artist: 'Local H',
    title: 'Lifers',
    date: '2020-04-10T05:00:00.000Z',
  };

  it('does not create a new release if not authorized', async () => {
    const response = await gqlCall({
      source: CREATE_RELEASE,
      variableValues: data,
      isAuthorized: false,
    });

    expect(response.errors[0].message).to.equal(ERRORS.USER.NOT_VALID);
  });

  it('creates a new release and returns it', async () => {
    const response = await gqlCall({
      source: CREATE_RELEASE,
      variableValues: data,
      isAuthorized: true,
    });
    const { id, ...release } = response.data.createRelease;
    newId = id;
    release.date = release.date.toISOString();

    expect(release).to.eql({
      artist: data.artist,
      title: data.title,
      date: data.date,
    });
  });

  it('does not create a new release without a required field', async () => {
    delete data.artist;
    // eslint-disable-next-line quotes, no-useless-escape
    const error = `Variable \"$artist\" of required type \"String!\" was not provided.`;

    const response = await gqlCall({
      source: CREATE_RELEASE,
      variableValues: data,
      isAuthorized: true,
    });

    expect(response.errors[0].message).to.equal(error);
  });
});

describe('Edit New Release mutation', () => {
  const data = {
    artist: 'Collective Soul',
    title: 'Half & Half',
    date: '2020-04-17T05:00:00.000Z',
  };

  it('does not edit a new release if not authorized', async () => {
    const response = await gqlCall({
      source: EDIT_RELEASE,
      variableValues: { ...data, id: newId },
      isAuthorized: false,
    });

    expect(response.errors[0].message).to.equal(ERRORS.USER.NOT_VALID);
  });

  it('edits a new release and returns it', async () => {
    const response = await gqlCall({
      source: EDIT_RELEASE,
      variableValues: { ...data, id: newId },
      isAuthorized: true,
    });
    const { editRelease } = response.data;
    editRelease.date = editRelease.date.toISOString();

    expect(editRelease).to.eql({
      id: newId,
      artist: data.artist,
      title: data.title,
      date: data.date,
    });
  });
});

describe('Delete New Release mutation', () => {
  it('does not delete a new release if not authorized', async () => {
    const response = await gqlCall({
      source: DELETE_RELEASE,
      variableValues: { id: newId },
      isAuthorized: false,
    });

    expect(response.errors[0].message).to.equal(ERRORS.USER.NOT_VALID);
  });

  it('deletes a new release and returns the ID', async () => {
    const response = await gqlCall({
      source: DELETE_RELEASE,
      variableValues: { id: newId },
      isAuthorized: true,
    });

    expect(response).to.eql({
      data: {
        deleteRelease: { id: newId },
      },
    });
  });

  it('does not delete a new release with an invalid ID', async () => {
    const response = await gqlCall({
      source: DELETE_RELEASE,
      variableValues: { id: invalidId },
      isAuthorized: true,
    });

    expect(response.errors[0].message).to.equal(ERRORS.RELEASE);
  });
});
