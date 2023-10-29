import UserModel from "../models/user.model.js";

export default class UserController {
  // displaying login view
  getLogin = (req, res) => {
    res.render("recruiterLogin");
  };

  // Rendering this view upon successful login
  postLogin = (req, res) => {
    const isUser = UserModel.checkUser(req.body);
    if (!isUser) {
      res.render("404", { message: "User not found" });
    } else {
      // Storing session Id in client side for securing user session
      req.session.userEmail = req.body.email;
      req.session.userName = isUser.name;
      res.render('landing', { userEmail: req.session.userEmail, userName: req.session.userName });
    }
  };

  // Retriving this view after user being registered
  postRegister = (req, res) => {
    UserModel.addUser(req.body);
    res.redirect("/login");
  };

  // logging user out of the session
  logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        throw new err();
      } else {
        res.render('/');
      }
    });
    res.clearCookie("lastVisit");
  };
}
