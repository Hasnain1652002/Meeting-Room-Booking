// api/server.js
const jsonServer = require('json-server');
const db = require('../db.json'); // bundle the file (read-only in production)

const server = jsonServer.create();
const router = jsonServer.router(db); // in-memory router (reads from db.json)
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
// router handles RESTful routes like /posts, /users
server.use(router);

// export function for Vercel
module.exports = (req, res) => {
  // route will be e.g. /api/posts
  server(req, res);
};
