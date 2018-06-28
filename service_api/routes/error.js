module.exports = function sendError(res,msg){
  return res.status(500).json({status: false, msg: msg});
}
