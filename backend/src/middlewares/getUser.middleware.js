const jwt = require('jsonwebtoken');


exports.userDetails = (req, res, next) => {
    // Logging request information
   const { headers } = req;

    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        console.log(parted.length);
        if (parted.length === 2) {
            const user = jwt.decode(parted[1], "secretkey");
            req.user = user; // Assign the decoded user to the request object

        } else {
            req.user = null;
        }
    } else {
        req.user = null;
    }

    // Call the next middleware or route handler
    next();
};