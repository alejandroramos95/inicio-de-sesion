const session = require('express-session')
const MongoStore = require('connect-mongo')
const bCrypt = require('bcrypt')

function createOnMongoStore() {
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
return session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://coderBackend:coderBackendPW@clustercoderbackend.tct9by1.mongodb.net/cursobackend2022?retryWrites=true&w=majority',
      mongoOptions: advancedOptions,
      ttl: 60,
      collectionName: 'sessions',
    }),
    secret: 'sh21501295asdjk',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
}

function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password);
}

module.exports = {createOnMongoStore, createHash, isValidPassword}
