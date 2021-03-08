(()=>{"use strict";var e={752:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(o(622)),s=r(o(127)),u=r(o(421)),i=r(o(620)),a=r(o(27));t.default=class{constructor(e){this.app=s.default(),this.port=e.port,this.host=e.host,this.middlewares(e.middleWares),this.routes()}middlewares(e){e.forEach((e=>{this.app.use(e)}))}routes(){this.app.use("/uploads",s.default.static(n.default.join(__dirname+"/../public/uploads"))),this.app.use("/api/books",i.default),this.app.use(a.default)}listen(){this.app.listen(this.port,(()=>{u.default.info("Server",`Server is running in ${this.host}:${this.port}`)}))}}},528:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),r(o(334)).default.config();const n=process.env.MONGO_USERNAME,s=process.env.MONGO_PASSWORD,u=process.env.MONGO_HOST,i={mongo:{host:u,password:s,username:n,options:{useUnifiedTopology:!0,useNewUrlParser:!0,socketTimeoutMS:3e4,keepAlive:!0,poolSize:50,autoIndex:!1,retryWrites:!1},url:`mongodb+srv://${n}:${s}@${u}`},server:{hostname:process.env.SERVER_HOSTNAME||"localhost",port:process.env.SERVER_PORT||1337},env:"production",url:process.env.CLIENT_URL};t.default=i},290:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,s){function u(e){try{a(r.next(e))}catch(e){s(e)}}function i(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(u,i)}a((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=n(o(619)),u=n(o(528)),i=n(o(421));t.default=()=>r(void 0,void 0,void 0,(function*(){try{(yield s.default.connect(u.default.mongo.url,u.default.mongo.options))&&i.default.info("Server","MongoDB Connected")}catch(e){i.default.error("Server",e.message,e)}}))},421:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=()=>(new Date).toISOString();t.default={info:(e,t,r)=>{r?console.info(`[${o()}] [INFO] [${e}] ${t}`,r):console.info(`[${o()}] [INFO] [${e}] ${t}`)},warn:(e,t,r)=>{r?console.warn(`[${o()}] [WARN] [${e}] ${t}`,r):console.warn(`[${o()}] [WARN] [${e}] ${t}`)},error:(e,t,r)=>{r?console.error(`[${o()}] [ERROR] [${e}] ${t}`,r):console.error(`[${o()}] [ERROR] [${e}] ${t}`)},debug:(e,t,r)=>{r?console.debug(`[${o()}] [DEBUG] [${e}] ${t}`,r):console.debug(`[${o()}] [DEBUG] [${e}] ${t}`)}}},978:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,s){function u(e){try{a(r.next(e))}catch(e){s(e)}}function i(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(u,i)}a((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=n(o(619)),u=n(o(111)),i=n(o(444)),a=n(o(487));t.default={createBook:(e,t,o)=>r(void 0,void 0,void 0,(function*(){try{const{author:o,title:r}=e.body,n=new u.default({_id:new s.default.Types.ObjectId,author:o,title:r}),i={result:yield n.save(),statusCode:201,contentType:"application/json"};return a.default(t,i)}catch(e){return void o(i.default.internal(`Something went wrong: ${e.message}`))}})),getAllBooks:(e,t,o)=>r(void 0,void 0,void 0,(function*(){try{const e=yield u.default.find({});if(e){const o={result:e,statusCode:200,contentType:"application/json"};return a.default(t,o)}}catch(e){return void o(i.default.internal(`Something went wrong: ${e.message}`))}}))}},444:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class o{constructor(e,t){this.code=e,this.message=t}static badRequest(e){return new o(400,e)}static internal(e){return new o(500,e)}static conflict(e){return new o(409,e)}static unauthorized(e){return new o(401,e)}static forbidden(e){return new o(403,e)}static unprocessable(e){return new o(422,e)}static notfound(e){return new o(404,e)}}t.default=o},27:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(o(444)),s=r(o(487));t.default=(e,t,o,r)=>{let u={result:{status:"failed",data:{error:e.message}},statusCode:e.code,contentType:"application/json"};return e instanceof n.default||(u=Object.assign(Object.assign({},u),{statusCode:500})),s.default(o,u)}},487:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=(e,t)=>{const{result:o,statusCode:r,contentType:n}=t;return e.setHeader("Content-Type",n),e.status(r).json(o)}},988:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=(e,t,o)=>{if(t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization"),"OPTIONS"==e.method)return t.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET"),t.status(200).json({});o()}},111:function(e,t,o){var r=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[o]}})}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&r(t,e,o);return n(t,e),t},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=s(o(619)),a=u(o(421)),l=new i.Schema({title:{type:String,required:!0},author:{type:String,require:!0},price:{type:Number,required:!0},createdAt:{type:Date,default:Date.now}},{timestamps:!0});l.post("save",(function(){a.default.info("MongoDB","Checkout the book we just saved: ",this)}));const d=i.default.model("Book",l);t.default=d},620:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(127),s=r(o(978)),u=n.Router();u.route("/create").post(s.default.createBook),u.route("/").get(s.default.getAllBooks),t.default=u},728:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(o(752)),s=r(o(910)),u=r(o(150)),i=r(o(479)),a=r(o(473)),l=r(o(725)),d=r(o(358)),c=r(o(995)),f=r(o(924)),p=r(o(528)),h=r(o(988)),_=r(o(290));let v=[a.default.json(),a.default.urlencoded({extended:!0}),h.default,d.default(),f.default(),l.default(),s.default(),c.default({level:6,threshold:1e4,filter:(e,t)=>!e.headers["x-no-compression"]&&c.default.filter(e,t)})];"development"===p.default.env&&(v=[...v,u.default("dev"),i.default({origin:p.default.url})]);const m=new n.default({port:Number(p.default.server.port),host:p.default.server.hostname,middleWares:v});_.default(),m.listen()},473:e=>{e.exports=require("body-parser")},995:e=>{e.exports=require("compression")},358:e=>{e.exports=require("cookie-parser")},479:e=>{e.exports=require("cors")},334:e=>{e.exports=require("dotenv")},127:e=>{e.exports=require("express")},924:e=>{e.exports=require("express-mongo-sanitize")},725:e=>{e.exports=require("helmet")},910:e=>{e.exports=require("hpp")},619:e=>{e.exports=require("mongoose")},150:e=>{e.exports=require("morgan")},622:e=>{e.exports=require("path")}},t={};!function o(r){if(t[r])return t[r].exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,o),n.exports}(728)})();