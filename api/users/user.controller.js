//Controller file doesn't do any work, it receives a request from the client, and decides which of the services will do that work


//importing all the services defined in /user.service
const {create, getUsers, getUserByUserId, updateUser, deleteUser, getUserByUserEmail} = require('./user.service');

//Importing methods used from bcrypt package for encrypting passwords
const {genSaltSync,hashSync,compareSync} = require('bcrypt'); 
const {sign} = require('jsonwebtoken');

// a module is a collection of javascript functions and objects that can be used by external applications
module.exports = {
  createUser: (req,res) => {
    const body = req.body; //Whatever the user passes will be saved inside this body

    //Encrypting password before storing in database
    //Cannot store password in plain text so will be storing password into cyber text so it cannot be readable.
    const salt = genSaltSync(10); 
    body.password = hashSync(body.password, salt) //the hash generated password is stored inside body.password

    //calling the create service which will query the body of this request into the database
    create(body, (err, results) => {
      //If error is passed
      if (err){
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error"
        });
      }

      // If success, the results parameter will be passed to callBack
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getUserByUserId: (req,res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      //If there is an error, console.log that error and return nothing
      if(err) {
        console.log(err);
        return;
      }
      //If no records were found
      if(!results) {
        return res.json({
          success: 0,
          message: 'No record was found with that ID'
        });
      }
      //If success, return user information
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req,res) => {
    getUsers((err,results) => {
      if (err){
        console.log(err);
        return false;
      }
      if(!results) {
        return res.json({
          success: 0,
          message: 'No records were found'
        });
      }
      return res.json({
        success:1,
        data: results
      });
    });
  },
  updateUser: (req,res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt); //Encrypting the password
    updateUser(body, (err,results) => {
      if(err){
        console.log(err);
      }
      if(!results){
        return res.json({
          success: 0,
          message: 'Failed to update user'
        });
      }
      return res.json({
        success: 1,
        message: "Updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    deleteUser(id, (err, results) => {
      if (err) {
        console.log(err);
      }
      //If no records were found
      if(!results) {
        return res.json({
          success: 0,
          message: 'No record was found with that ID'
        });
      }
      return res.json({
        success: 1,
        message: 'User Deleted Successfully!'
      });
    });
  },
  login: (req,res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err,results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json ({
          success: 0,
          data: 'Invalid email or password'
        });
      }
      const result = compareSync(body.password,results.password);
      if(result){
        results.password = undefined;
        const jsontoken = sign({result:results},process.env.KEY, {
          expiresIn: '1hr'
        });
        return res.json({
          success: 1,
          message: 'Login successfully',
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          message: 'Invalid email or password'
        });
      }

    });
  }//,
  // logout: (req,res) => {
  //   res.cookie('jwt', '', { maxAge: 1});
  //   res.redirect('/');
  // }
};