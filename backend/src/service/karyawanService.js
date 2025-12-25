const userModel = require('../models/karyawanModel');
// service query mongo
module.exports.createUserService = async (data) => {
    return await userModel.create(data);
};

module.exports.getAllUsersService = async () => {
    return await userModel.find().select({
        token: 0,
        __v: 0,
    });
};

module.exports.getUserSearchByNameService = async (name) => {
    return await userModel.find({ fullName: { $regex: name, $options: 'i' } }).select(
        {
            token: 0,
            __v: 0,
        }
    );
}

module.exports.getUserByIdService = async (id) => {
    return await userModel.findById(id).select({
        token: 0,
        __v: 0,
    });
};

module.exports.getUserByTokenService = async (token) => {
    return await userModel.findOne({ token }).select(
        {
            token: 0,
            __v: 0,
        }
    );
};

module.exports.updateUserByIdService = async (id, data) => {
    return await userModel.findByIdAndUpdate(id, data);
};

module.exports.deleteUserService = async (id) => {
    return await userModel.findByIdAndDelete(id);
};

