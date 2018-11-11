# express_all
### pm2管理
删除所有实例 pm2 delete all

## 阿里云nginx设置

        http {
            include       mime.types;
            default_type  application/octet-stream;
        
            sendfile        on;
            #tcp_nopush     on;
        
            #keepalive_timeout  0;
            keepalive_timeout  65;
            gzip  on;
            gzip_comp_level 3;
            gzip_buffers     4 8k;
            gzip_proxied any;
            gzip_min_length  1024;
            gzip_types text/plain text/css application/x-javascript application/javascript application/xml;
        
            server {
                listen       80;
                server_name  weixiaoyi.club;
        
                location ^~ /api/  {
                    proxy_pass http://127.0.0.1:3000;
                }
        
                 location / {
                     root /myprojects/rxjs_mobx/build;
                     try_files $uri $uri/ /index.html =404;
                 }
            }
        }