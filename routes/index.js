const express = require("express");
const apiRouter = express.Router();
const playerRouter = require('./player');
const managerRouter = require('./manager');
apiRouter.use("/players",playerRouter)
apiRouter.use("/managers",managerRouter)


module.exports =apiRouter