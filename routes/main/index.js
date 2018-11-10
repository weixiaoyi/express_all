const { ExpressRouter } = require('../../components')
const self = new ExpressRouter();


/* GET users listing. */
self.router.get('/', (req, res) => {
  res.send('fffddd');
});

module.exports = self;
