/**
 * Created by wangct on 2018/5/12.
 */



const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const queryString = require('querystring');
const port = 8000;
const shopPath = path.resolve(__dirname,'../src/json/shop.json');
http.createServer((req,res) => {
    let pathname = url.parse(req.url).pathname;
    console.log(pathname);
    if(pathname === '/inputShop'){
        fs.readFile(shopPath,(err,data) => {
            if(err){
                res.writeHead(500);
                res.end('error');
            }else{
                try{
                    data = JSON.parse(data.toString());
                }catch(e){
                    data = [];
                }
                let b = new Buffer(0);
                req.on('data',c => {
                    b = Buffer.concat([b,c]);
                });
                req.on('end',() => {
                    let paramData = queryString.parse(b.toString());
                    let lastData = data[data.length - 1];
                    paramData.id = 1;
                    if(lastData){
                        paramData.id = lastData.id + 1;
                    }
                    data.push(paramData);
                    fs.writeFile(shopPath,JSON.stringify(data),err => {
                        if(err){
                            res.writeHead(500);
                            res.end('error');
                        }else{
                            res.writeHead(200,{
                                'Access-Control-Allow-Origin':'http://localhost:3000'
                            });
                            res.end('success');
                        }
                    });
                });
            }
        });
    }else{
        res.writeHead(200);
        res.end('');
    }
}).listen(port,() => {
    console.log('the server is started on port '+ port +'!');
});