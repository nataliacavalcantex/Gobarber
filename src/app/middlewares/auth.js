import auth from "../../config/auth"

import  {promisify} from 'util' //callback ->async awair
import jwt from 'jsonwebtoken'

export default async (req,res,next)=>{
    const authHeader= req.headers.authorization

    if(!authHeader){
        return  res.status(401).json({error:' Token not provided'})
    }

    const [,token] = authHeader.split(' ')

    try{
        const decoded = await promisify(jwt.verify)(token,auth.secret)
        req.userId=decoded.id
        console.log(decoded)
        return next()
    }catch(err){
        return  res.status(401).json({error:'Invalid Token'})
    }
    
}