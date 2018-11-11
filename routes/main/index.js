const { ExpressRouter } = require('../../components')
const self = new ExpressRouter();

self.router.get('/', (req, res) => {
  res.send('fffddd');
});

module.exports = self;
