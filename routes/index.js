const routerCenter = (app) => {
  app.use('/main', require('./main/index').router)
  app.use('/', (req, res) => {
    res.redirect('/main')
  });
}

module.exports = routerCenter;
