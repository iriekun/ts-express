export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET
  },
  db: 'localhost/vidnet:27017?replicaSet=rsName'
};
