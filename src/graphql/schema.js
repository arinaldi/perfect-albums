module.exports = `
  scalar Date

  type Favorite {
    artist: String!
    title: String!
    year: String!
  }

  type Release {
    id: ID!
    artist: String!
    title: String!
    date: Date
  }

  type Song {
    id: ID!
    artist: String!
    title: String!
    link: String!
    createdAt: Date!
  }

  type Id {
    id: ID!
  }

  type Query {
    health: String!
    favorites: [Favorite!]!
    releases: [Release!]!
    songs: [Song!]!
  }

  type Mutation {
    createSong(artist: String!, title: String!, link: String!): Song!
    deleteSong(id: ID!): Id!
  }
`;
