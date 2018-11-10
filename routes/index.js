const mainRouter = require('./main/index');
const userRouter = require('./user/index');
const routerCenter = (app) => {
  app.use('/main',mainRouter)
  app.use('/user',userRouter)
  app.use('/',(req,res)=>{
    res.send('已经进入应用')
  });
}

module.exports = routerCenter;
