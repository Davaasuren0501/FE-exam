const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.getJWToken = function () {
    const token = jwt.sign(
        { 
            id: this._id
        }
        , process.env.JWT_SECRET
        , {
            expiresIn: process.env.JWT_EXPIRESIN,
        }
    );
  
    return token;
};

UserSchema.methods.checkPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);