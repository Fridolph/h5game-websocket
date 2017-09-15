**注：本例为慕课网 channingbreeze老师的课程 基于websocket的火拼俄罗斯 的示例~ 仅供学习交流，请务他用**

[基础篇](http://www.imooc.com/learn/861)
[单机版](http://www.imooc.com/learn/882)
[升级版](http://www.imooc.com/learn/885)

## Websocket

http://www.websocket.org

HTML5

Web端的socket，server和client可以互相发送消息

本质是TCP连接

---

传统HTTP请求，由浏览器发起，服务端接受到请求，再返回一个数据，一次来回就完成请求并断开

websocket，也由浏览器发起（websocket请求），服务器接收到socket请求，会在浏览器和服务端建立WebSocket连接，该连接允许浏览器和服务器相互发送消息，浏览器和服务端之一不断开，那么socket连接就不会断开


## 总结

WebSocket 允许浏览器和服务器简历持久连接
HTML5的websocket API
服务端使用nodejs-websocket实现websocket server
使用socket.io实现websocket

---

class 里的每个demo对应着课程基础篇中的案例

game 为单击版的代码示例