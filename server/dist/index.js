"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const port = process.env.PORT || 3000;
const server = http_1.default.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end("Hello world");
});
server.listen(port);
console.log("hello");
