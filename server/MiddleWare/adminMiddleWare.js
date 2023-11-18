export const adminMiddleWare = async (req, res, next) => {
    const adminId = process.env.FORUM_ADMIN_ID;
    const userId = req.body.userId;

    try {
        if (userId === adminId) {
            next();
        } else {
            return res.status(403).json({ message: "Action forbidden." })
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
}