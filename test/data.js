const albums = [
  {
    artist: 'Nirvana',
    title: 'Nevermind',
    year: '1991',
    cd: true,
    aotd: true,
    favorite: true,
  },
  {
    artist: 'Pearl Jam',
    title: 'Ten',
    year: '1991',
    cd: true,
    aotd: true,
    favorite: true,
  },
  {
    artist: 'HIM',
    title: 'Razorblade Romance',
    year: '1999',
    cd: true,
    aotd: true,
    favorite: true,
  },
  {
    artist: 'AFI',
    title: 'Crash Love',
    year: '2009',
    cd: false,
    aotd: true,
    favorite: false,
  },
];

const songs = [
  {
    artist: 'Nirvana',
    title: 'Smells Like Teen Spirit',
    link: 'youtube.com',
  },
  {
    artist: 'Pearl Jam',
    title: 'Even Flow',
    link: 'youtube.com',
  },
  {
    artist: 'HIM',
    title: 'I Love You (Prelude to Tragedy)',
    link: 'youtube.com',
  },
];

const releases = [
  {
    artist: 'City and Colour',
    title: 'A Pill for Loneliness',
    date: '2019-10-04T05:00:00.000Z',
  },
  {
    artist: 'Bury Your Dead',
    title: 'We Are Bury Your Dead',
    date: '2019-10-11T05:00:00.000Z',
  },
];

const invalidId = '5939ed45e97818dae5385493';

const getUser = () => {
  const epoch = (new Date()).getTime();
  return {
    username: `user-${epoch}`,
    password: '1234',
  };
};

module.exports = { albums, songs, releases, invalidId, getUser };
