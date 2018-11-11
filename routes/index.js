const routerCenter = (app) => {
  app.use('/main', require('./main/index').router)
  app.use('/api/*', (req, res) => {
    res.send('ok')
  });
  app.use('/', (req, res) => {
    res.json({
      data:'hhhh',
      ret:0
    })
  });
}

module.exports = routerCenter;
