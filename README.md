```
tsc --init
npm init -y
npm i -D typescript ts-node nodemon @types/node @types/express

```

To use transaction in mongodb, it's required to have replica sets instead of standalone mongodb server https://mongoosejs.com/docs/transactions.html

To install mongodb replica set
`npm install run-rs -g`
Read more at https://www.npmjs.com/package/run-rs

To use jest with typescript https://github.com/kulshekhar/ts-jest
