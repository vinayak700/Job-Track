let id = 0;
export default class UserModel {
    constructor(name, email, password) {
        this.id = ++id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static addUser(user) {
        const { name, email, password } = user;
        const newUser = new UserModel(name, email, password);
        users.push(newUser);
        return newUser;
    }
    static checkUser(userData) {
        const { email, password } = userData;
        const user = users.find(user => user.email == email && user.password == password);
        return user;
    }
    static getAll() {
        return users;
    }

}
let users = [];