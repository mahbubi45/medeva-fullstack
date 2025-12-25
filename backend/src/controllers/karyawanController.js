const { model } = require('mongoose');
const Karyawan = require('../service/karyawanService.js');
const { authenticateToken, authorizeAdmin, tokenExtractor } = require("../middlewares/authMiddleware");

module.exports.createUserController = async (req, res, next) => {
  try {
    const data = await Karyawan.createUserService(req.body);
    res.status(201).json({ success: true, message : "User Successfully Created" });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsersController = async (req, res, next) => {
  try {
    const data = await Karyawan.getAllUsersService();
    const count = data.length; 
    res.json({ 
      success: true, 
      status: 200,
      count,       
      data 
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserSearchByNameController = async (req, res, next) => {
  try {
    const { name } = req.query; 
    if (!name) return res.status(400).json({ message: 'Name query is required' });
    const data = await Karyawan.getUserSearchByNameService(name);
    res.json({ 
      success: true,
      status: 200,
      data
     });
  } catch (err) {
    next(err);
  }
};

//  profile
module.exports.getUserByTokenController = async (req, res, next) => {
  try {
    const token = req.token; 

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const data = await Karyawan.getUserByTokenService(token);

    res.json({
      success: true,
      status: 200,
      data
    });
  } catch (err) {
    next(err);
  }
};


module.exports.getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Karyawan.getUserByIdService(id);
    res.json({ 
      success: true,
      status: 200,
      data
     });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Karyawan.updateUserByIdService(id, req.body);
    res.json({ success: true, message : "User Successfully Updated"});
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Karyawan.deleteUserService(id);
    res.json({ success: true, message : "User Successfully Deleted"});
  } catch (err) {
    next(err);
  }
};

