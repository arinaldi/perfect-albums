module.exports = `
  type Favorite {
    id: ID!
    artist: String!
    title: String!
    year: String!
  }

  type Song {
    id: ID!
    artist: String!
    title: String!
    link: String!
    createdAt: String!
  }

  type Id {
    id: ID!
  }

  type Query {
    health: String!
    favorites: [Favorite!]!
    songs: [Song!]!
  }

  type Mutation {
    createSong(artist: String!, title: String!, link: String!): Song!
    deleteSong(id: ID!): Id!
  }
`;
