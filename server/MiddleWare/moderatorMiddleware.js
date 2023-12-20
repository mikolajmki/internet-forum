import User from "../Models/User.js";

export const moderatorMiddleWare = async (req, res, next) => {
    const userId = req.body.userId;

    const user = await User.findById(userId);

    console.log(user.isModerator)

    try {
        if (user.isModerator) {
            next();
        } else {
            return res.status(403).json({ message: "Not a moderator." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
}