'use strict'
const db = require('./conn');
const bcrypt = require('bcryptjs');

class UsersModel {
    constructor(id, user_name, user_email, password) {
        this.id = id;
        this.user_name = user_name;
        this.user_email = user_email;
        this.password = password;
    }

    // PRIVATE (INSTANCE) METHOD TO CHECK PASSWORD VALIDITY
    async checkPassword(hashedPassword) {
        // RETURNS TRUE OR FALSE
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    // INSTANCE METHOD!!
    // NOT PASSING ANY ARGUMENTS
    async save() {
        try {
            const response = await db.one(`INSERT INTO user (user_name, user_email, password) VALUES ($1, $2, $3) RETURNING id;`, [this.user_name, this.user_email, this.password]);
            console.log('User was created with ID:', response.id);
            return response;
        } catch (error) {
            console.log('error', error.message);
            return error.message;
        }
    }

    // ANOTHER INSTANCE METHOD
    // NOT PASSING ARGUMENTS
    async login() {
        try {
            const response = await db.one(`SELECT id, user_name, user_email, password FROM user WHERE user_email = $1;`, [this.user_email]);
            const isValid = await this.checkPassword(response.password);
            if (!!isValid) {
                // if (isValid === absolutely, completely, totally like really, really TRUE!)
                const { user_name, id } = response;
                return { isValid, user_name, user_id: id }
            } else {
                return { isValid }
            }
            
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = UsersModel;