const fs = require('fs');
const express = require('express');
const Client = require('ssh2').Client;
const archiver = require('archiver');

const router = express.Router();
const output = fs.createWriteStream('D:/myproject/rxjs_mobx' + '/build.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

class Ssh{
  constructor(){

  }

}

router.get('/', function(req, res) {
  const conn = new Client();
  conn.on('ready', function() {
    console.log('Client :: ready')
    conn.sftp(function(err, sftp) {
      if (err) throw err;
      output.on('end', function () {
        res.send('end')
      })
      output.on('close', function () {
        return res.send('压缩成功')
        // conn.exec('cd /myprojects/rxjs_mobx/build && rm -rf **',(err,stream)=>{
        //   if(!err){
        //     sftp.fastPut('D:/myproject/rxjs_mobx/build.zip','/myprojects/rxjs_mobx/build.zip',function(err){
        //       if(!err){
        //         conn.exec('cd /myprojects/rxjs_mobx && unzip build.zip -d build',(err,stream)=>{
        //           if(!err){
        //             res.send('删除文件成功&&替换文件成功&&解压成功')
        //           }
        //           conn.end()
        //         })
        //       }else{
        //         res.send(err)
        //         console.log(err,'------------')
        //       }
        //     })
        //   }
        // })

      })
      archive.on('error', function (err) {
        res.send('压缩文件失败')
      })
      archive.pipe(output);
      archive.directory('D:/myproject/rxjs_mobx/build/',false)
      archive.finalize()
    });

  }).connect({
    host: '47.244.59.36',
    port: 22,
    username: 'root',
    password: 'Weixiaoyao886'
  });


});

module.exports = router;
