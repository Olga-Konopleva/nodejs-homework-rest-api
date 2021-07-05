const { User } = require('../schemas/userModel');

const findUserByEmail = async email => {
  return await User.findOne({ email });
};

const updateToken = async ({ contactId, token }) => {
  return await User.findByIdAndUpdate(contactId, { token }, { new: true });
}

const createUser = async (email, password) => {
  const user = new User({ email, password });
  return await user.save();
};

const updateUserById = async (userId, body) => {
  const result = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: { ...body },
    },
    { new: true }
  );
  if (!result) {
    throw new CustomError(statusCode.NOT_FOUND, 'Not found');
  }
  return result;
};

const updateAvatar = async (userId, file, avatar, cb) => {
  const avatarURL = await cb(file, avatar);
  await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
  return avatarURL;
};

module.exports = {
  findUserByEmail,
  updateToken,
  createUser,
  updateUserById,
  updateAvatar
}