const { Ssh } = require('../components')
const express = require('express');
const router = express.Router();

router.get('/:name', (req, res) => {
  const { name } = req.params
  let config = null
  if (name) {
    switch (name) {
      case 'weixiaoyi':
        config = {
          host: '47.244.59.36',
          port: 22,
          username: 'root',
          password: 'Weixiaoyao886',
          localDir: 'D:/myproject/rxjs_mobx/build',
          remoteDir: '/myprojects/rxjs_mobx/build',
        }
    }
  }
  if (config) {
    return new Ssh({
      ...config,
      callback: (msg) => {
        res.send(msg)
      }
    })
  }
  res.send('输入错误')
});

module.exports = router;
