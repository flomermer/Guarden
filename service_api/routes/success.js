module.exports = function sendSuccess(res){
    return res.status(200).json({status:true})
}
