export const setLastVisit = (req, res, next) => {
    // Getting cookies from the cookies received along with the client request
    if (req.cookies.lastVisit) {
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    // Setting lastvisit cookie
    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 2 * 24 * 3600 * 1000,
    });
    next();
}



