const jwt = require('jsonwebtoken');


async function authAdmin( req, res, next ){
    

        const token = req.cookies.token;

        if( !token ){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if( decoded.role !== 'admin' ){
            return res.status(403).json({
                message:"You don't have access to admin panel"
            })
        }

        req.user = decoded;
        next();
    }catch(err){
        console.log("error : ", err );
        return res.status(401).json({
            message:"Unathorized"
        })
    }
}


async function authUser(req,res,next){
    const token = req.cookies.token;

    if( !token ){
        return res.status(401).json({
            message:"Unauthoriozed"
        })
    }

    try{
        const decoded = jwt.verify( token , process.env.JWT_SECRET_KEY);
        
        req.user = decoded;

        next();
    }catch(err){
        console.log("error", err);
         return res.status(401).json({
            message:"Unauthoriozed"
        })
    }

}

module.exports = { authAdmin, authUser };

