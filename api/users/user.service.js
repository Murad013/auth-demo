//Where the business is done

const pool = require('../../config/database');

//Receives data from the controller and callBack function which will be called inside this method
//If code is successful we will pass the first parameter as null and second as reserved
//If code is 'error' we will call the first parameter

module.exports = {
  create: (data, callBack) => {
    pool.query(
      //data parameter
      `insert into registration(id,firstName,lastName,email,password,gender)
              values(?,?,?,?,?,?)`,
        [
          data.id,
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.gender
        ],
        //callBack parameter
        (error,results,fields) => {
          // error and results cannot be both valuable or null, if one is null the other is valuable and vice versa
          if (error) {
            return callBack(error); //if error
          }
          return callBack(null, results); //if no error
        }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select id,firstName,lastName,email,password,gender from registration`,
      [],
      (error,results,fields) => {
        if(error){
          return callBack(error);
        }
        return callBack(null,results);
        }
    );
  },
  getUserByUserId: (id,callBack) => {
    pool.query(
      `select * from registration where id = ?`,
      [id],
      (error,results,fields) => {
        if(error){
          return callBack(error);
        }
        return callBack(null,results[0]);  //result is returned in an array format so we must receive the first index only because we only want one user at a time
        }
    );
  },
  updateUser: (data,callBack) => {

      pool.query(
        //data parameter
        `update registration set firstName =?, lastName =?, email =?, password =?, gender =? where id = ?`,
          [
            data.firstName,
            data.lastName,
            data.email,
            data.password,
            data.gender,
            data.id
          ],
          (error,results,fields) => {
            // error and results cannot be both valuable or null, if one is null the other is valuable and vice versa
            if (error) {
              return callBack(error); //if error
            }
            return callBack(null, results); //if no error
          }
      );
  },
  deleteUser: (id, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [id],
      (error,results,fields) => {
        // error and results cannot be both valuable or null, if one is null the other is valuable and vice versa
        if (error) {
          return callBack(error); //if error
        }
        return callBack(null, results[0]); //if no error
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error,results,fields) => {
        if(error){
          return callBack(error);
        }
        return callBack(null,results[0]);
      }
    );
  }
};                   
                      
              