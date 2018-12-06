const fs = require('fs');
const archiver = require('archiver');
const Client = require('ssh2').Client;


class Ssh {
  constructor(options = {}) {
    this.options = {
      host: '',
      port: 22,
      username: '',
      password: '',
      localDir: '',
      remoteDir: '',
      callback: (msg) => {},
      ...options
    }
    this.destName = 'build.zip'
    this.init()
  }

  init() {
    const { callback, localDir, host, port, username, password } = this.options
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    const output = fs.createWriteStream(`${localDir}/${this.destName}`);

    output.on('end', function () {
      callback('end')
    })
    output.on('close', () => {
      this.conn = new Client();
      this.conn.on('ready', () => {
        console.log('ssh已经连接上---------------------------')
        this.sftp()
        // callback('压缩成功')
        // this.conn.end()
      })
        .connect({
          host,
          port,
          username,
          password
        });
    })

    archive.on('error', function (err) {
      console.log(err, 'archive压缩出错了----------------------------')
    })

    archive.pipe(output)
    archive.directory(localDir, false, (entryData) => {
      return entryData.name === this.destName ? false : entryData
    })
    archive.finalize()
  }

  sftp() {
    const { callback, localDir, remoteDir } = this.options
    this.conn.sftp((err, sftp) => {
      if (err) throw err;
      this.conn.exec(`mkdir ${remoteDir} && cd ${remoteDir}`, (err) => {
        if (!err) {
          sftp.fastPut(`${localDir}/${this.destName}`, `${remoteDir}/${this.destName}`, (err) => {
            if (!err) {
              this.conn.exec(`cd ${remoteDir} && unzip ${this.destName}`, (err) => {
                if (!err) {
                  callback('压缩文件成功&&上传换文件替换文件夹成功&&解压成功')
                }
                this.conn.end()
              })
            } else {
              callback(err)
              console.log(err, 'fastPut出错------------')
            }
          })
        }
      })
    });
  }
}


module.exports = Ssh;
