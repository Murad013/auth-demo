// This is for authorization of the api. First thing is user must log in, once they log in they obtain the JWT. Once the JWT is given and is successful, the user can use all the other microservices the API has to offer

const{verify}=require('jsonwebtoken');

module.exports = {
     checkToken: (req,res,next) => {
          let token = req.get('authorization');
          if(token){
               token = token.slice(7); //'Bearer' is removed 
               verify(token,process.env.KEY,(err, decoded) => {
                    if(err){
                         res.json({
                              success: 0,
                              message: 'Invalid Token'
                         });
                    }else{
                         next();
                    }
               });

          }else{
               res.json({
                    success: 0,
                    message: 'Access Denied! Unauthorized User'
               });
          }
     }
}