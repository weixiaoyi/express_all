const fs = require('fs');
const express = require('express');
const archiver = require('archiver');
const Client = require('ssh2').Client;

const router = express.Router();



// class Ssh{
//   constructor(){
//
//   }
//
// }

router.get('/', function(req, res) {
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  const output = fs.createWriteStream('D:/myproject/rxjs_mobx' + '/build.zip');

  output.on('end', function () {
    res.send('end')
  })
  output.on('close', function () {


    const conn = new Client();

    conn.on('ready', function() {
      console.log('Client :: ready')
      conn.sftp(function(err, sftp) {
        if (err) throw err;
        conn.exec('cd /myprojects/rxjs_mobx/build && rm -rf **',(err,stream)=>{
          if(!err){
            sftp.fastPut('D:/myproject/rxjs_mobx/build.zip','/myprojects/rxjs_mobx/build/build.zip',function(err){
              if(!err){
                conn.exec('cd /myprojects/rxjs_mobx/build/ && unzip build.zip',(err,stream)=>{
                  if(!err){
                    res.send('删除文件成功&&替换文件成功&&解压成功')
                  }
                  conn.end()
                })
              }else{
                res.send(err)
                console.log(err,'------------')
              }
            })
          }
        })

        // res.send('压缩成功')
        // conn.end()
      });

    }).connect({
      host: '47.244.59.36',
      port: 22,
      username: 'root',
      password: 'Weixiaoyao886'
    });
  })

  archive.on('error', function (err) {
    console.log(err,'----------------------------------------')
  })

  archive.pipe(output)
  archive.directory('D:/myproject/rxjs_mobx/build/',false)
  archive.finalize()
});

module.exports = router;
