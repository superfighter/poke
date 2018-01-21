// import {Server as WebSocketServer} from 'ws';
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    port: 8886
});
// wss.on('connection', function (ws){
//     console.log('client connected');
//     ws.on('message', function (message) {
//         console.log(message);
//         ws.send(message.split('').reverse().join());
//     });
// });
var stocks = {
    "AAPL": 95.0,
    "MSFT": 50.0,
    "AMZN": 300.0,
    "GOOG": 550.0,
    "YHOO": 35.0
}
function randomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var stockUpdater;
var randomStockUpdater = function() {
    for (var symbol in stocks) {
        if(stocks.hasOwnProperty(symbol)) {
            var randomizedChange = randomInterval(-150, 150);
            var floatChange = randomizedChange / 100;
            stocks[symbol] += floatChange;
        }
    }
    var randomMSTime = randomInterval(500, 2500);
    stockUpdater = setTimeout(function() {
        randomStockUpdater();
    }, randomMSTime);
}
randomStockUpdater();
wss.on('connection', function (ws) {
    var sendStockUpdates = function (ws) {
        if (ws.readyState == 1) {
            var stocksObj = {};
            for (var i = 0; i < clientStocks.length; i++) {
              var symbol = clientStocks[i];
                stocksObj[symbol] = stocks[symbol];
            }
            if (stocksObj.length !== 0) {
                ws.send(JSON.stringify(stocksObj));//需要将对象转成字符串。WebSocket只支持文本和二进制数据
                console.log("更新", JSON.stringify(stocksObj));
            }
           
        }
    }
    var clientStockUpdater = setInterval(function () {
        sendStockUpdates(ws);
    }, 1000);
    ws.on('message', function (message) {
        var stockRequest = JSON.parse(message);//根据请求过来的数据来更新。
        console.log("收到消息", stockRequest);
        console.log(stockRequest.stocks);
        clientStocks = stockRequest['stocks'];
        sendStockUpdates(ws);
    });
});