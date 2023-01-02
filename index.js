const http = require("http");
const fs = require("fs");
var requests = require("requests");

const hoomeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) =>{
    console.log("the value", orgVal.main)
    console.log("tempVal", tempVal)
    let templerature = tempVal.replace("{%tempval%}", orgVal.main.temp)
    templerature = templerature.replace("{%tempmin%}", orgVal.main.temp_min)
    templerature = templerature.replace("{%tempmax%}", orgVal.main.temp_max)
    templerature = templerature.replace("{%location%}", orgVal.name)
    templerature = templerature.replace("{%country%}", orgVal.sys.country)
    return templerature
}

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests("https://api.openweathermap.org/data/2.5/weather?q=pune&appid=78244e5dc70963fae8fead8e36d42f83")
      .on("data", (chunk) => {
        let objData = JSON.parse(chunk)
        let arrData = [objData]
        console.log(arrData[0].main);
        const realData = arrData.map((val) => replaceVal(hoomeFile, val)).join("")
        console.log("realData", realData)
        res.write(realData)
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);

        console.log("end");
        res.end()
      });
  }
});

server.listen("4000","127.0.0.1");

//api.openweathermap.org/data/2.5/weather?q=pune&appid=78244e5dc70963fae8fead8e36d42f83

