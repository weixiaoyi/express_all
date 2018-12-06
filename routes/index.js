const routerCenter = (app) => {
  app.use('/',require('./home'))
  app.use('/ssh',require('./ssh'))
}

module.exports = routerCenter


