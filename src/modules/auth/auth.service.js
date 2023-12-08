const createHttpError = require('http-errors');
const users = require('../user/user.model');
const AuthMessages = require('./auth.messages');
const { randomInt } = require('crypto');

class AuthService {
    #users;
    constructor() {
        this.#users = users;
    }
    async sendOTP(mobile) {
        const user = await this.#users.findOne({ mobile });

        const now = new Date().getTime();
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + 1000 * 60 * 2,
        };

        if (!user) {
            const newUser = await this.#users.create({ mobile, otp });
            return newUser;
        }

        if (user.otp && user.otp.expiresIn > now) {
            throw createHttpError.BadRequest(AuthMessages.OTPNotExpired);
        }

        user.otp = otp;
        await user.save();
        return user;
    }

    async checkOTP(mobile, code) {}

    async checkMobileExistence(mobile) {
        const user = await this.#users.findOne({ mobile });
        if (!user)
            throw new createHttpError.NotFound(AuthMessages.UserNotFound);
        return user;
    }

    async logout() {}
}

module.exports = new AuthService();
