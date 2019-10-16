export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET
  },
  db: 'localhost/vidnet_test:27017?replicaSet=rsName'
};
