const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyJWT = async(req,res,next) =>
{
    try {
      const token = req.cookies?.token || ""
  
      if(!token){
        return res
                .status(400)
                .json({
                  message : "User is not logged in!",
                  success : false
                })
      }
  
      // if token is available fetch user id
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  
      const userId = decodedToken.id
      if(!userId){
        return res
                .status(400)
                .json({
                  message : "User not found!",
                  success : false
                })
  
      }
  
      req.user = userId
      next()
    } 
    catch (error) {
      return res
              .status(500)
              .json({
                message : "Internal server error while verifying user",
                success : false
              })
    }
}