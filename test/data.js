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

const invalidId = '5939ed45e97818dae5385493';

const user = {
  username: 'user',
  password: '1234',
};

module.exports = { albums, songs, invalidId, user };
