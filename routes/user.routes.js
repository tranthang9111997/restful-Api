const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const controllerOlddevice = require("../controllers/olddevicePlus");
const controllerssh=require("../controllers/proxy");
const controller_load_setting=require("../controllers/loadsetting");
const controller_micro=require("../controllers/updatemicro");
const receive=require("../controllers/receive_hotmail");
module.exports =  function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"
      )
    next();
  });
  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get("/api/buymail",receive.buymail);
  app.get("/api/hotmail",receive.hotmail);
  app.get("/api/ssh",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controllerssh.getssh);
  app.get("/api/setting",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controller_load_setting.loadsetting);
  app.post("/api/putsetting",controller_load_setting.putsetting);
  //app.post("/api/postsetting",controller_load_setting.postSetting);
  app.post("/api/set_all_setting",controller_load_setting.put_allSetting);
  app.post("/api/deleteSetting",controller_load_setting.delete_setting);
  app.get("/api/micro",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controller_micro.micro);
  app.get("/api/fakeinfo",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controller.SELECT);
  app.post("/api/fakeinfo/PostoldDevice",controllerOlddevice.postoldDevice);
  app.get("/api/fakeinfo/oldDevice",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controllerOlddevice.getoldDevice);
  app.get("/api/getmicro",[authJwt.verifyToken, authJwt.isModeratorOrAdmin],controller_load_setting.getmicro);
 
};