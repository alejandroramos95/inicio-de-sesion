// MIDDLEWARE PASSPORT

app.use(passport.initialize())
app.use(passport.session())

// STRATEGIES

passport.use(
  'register',
  new localStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    console.log('register', username + password)
    try {
      UsuariosSchema.create(
        {
          username,
          password: createHash(password),
          direccion: req.body.direccion,
        },
        (err, userWithId) => {
          if (err) {
            console.log(err)
            return done(err, null)
          }
          return done(null, userWithId)
        }
      )
    } catch (e) {
      return done(e, null)
    }
  })
)

passport.use(
  'login',
  new localStrategy((username, password, done) => {
    mongoose.connect('')
    try {
      UsuariosSchema.findOne(
        {
          username,
        },
        (err, user) => {
          if (err) {
            return done(err, null)
          }

          if (!user) {
            return done(null, false)
          }

          if (!isValidPassword(user, password)) {
            return done(null, false)
          }

          return done(null, user)
        }
      )
    } catch (e) {
      return done(e, null)
    }
  })
)

//serializar y deserializar

passport.serializeUser((usuario, done) => {
  console.log(usuario)
  done(null, usuario._id)
})

passport.deserializeUser((id, done) => {
  UsuariosSchema.findById(id, done)
})

// fin copy paste after
