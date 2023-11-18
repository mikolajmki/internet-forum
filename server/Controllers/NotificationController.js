import Notification from "../Models/Notification.js";

export const createNotificationsOfType = (type, section, authorId) => {
    const notifications = []
    
    if (type === "thread-author") {
        notifications.push(
            new Notification({
                sender: authorId,
                receiver: section.author,
                type: type,
                thread: section._id,
                forum: section.forumId
            })
        )
    } else if (type === "thread") {
        section.followers.map((receiverId) => {
            if (authorId !== receiverId.toString()) {
                notifications.push(
                    new Notification({
                        sender: authorId,
                        receiver: receiverId,
                        type: type,
                        thread: section._id,
                        forum: section.forumId
                    })
                )
            }
        });
    } else if (type === "forum") {
        console.log(section)
        section.followers.map((receiverId) => {
            if (authorId !== receiverId.toString()) {
                notifications.push(
                    new Notification({
                        sender: authorId,
                        receiver: receiverId,
                        type: type,
                        thread: section.threadId,
                        forum: section._id
                    })
                )
            }
        });
    }

    return notifications;
}

export const getNotificationsByUserId = async (req, res) => {
    const userId = req.body.userId;

    try {
        const notifications = await Notification
        .find({ receiver: userId }, ["-receiver"])
        .sort("-createdAt")
        .populate("sender", ["username", "profilePicture"])
        .populate("thread", ["title"])
        .populate("forum", ["name"]);
        return res.status(200).json(notifications);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

export const deleteNotificationsByUserId = async (req, res) => {
    const userId = req.body.userId;

    try {
        await Notification.deleteMany({ receiver: userId });
        return res.status(200).json({ message: "Notifications deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

export const createNotification = async (req, res) => {

    const notification = new Notification({
        sender: req.body.userId,
        receiver: req.body.receiverId,
        type: req.body.type,
    });

    try {
        await notification.save();
        return res.status(200).json(notification);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const updateNotification = async (req, res) => {
    const notificationId = req.params.id;

    try {
        await Notification.findByIdAndUpdate({ _id: notificationId }, { $set: req.body });
        
        return res.status(200).json({ message: "Notification updated!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

export const deleteNotification = async (req, res) => {
    const notificationId = req.params.id;

    try {

        await Notification.findOneAndDelete({ _id: notificationId });
        return res.status(200).json({ message: "Notification deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};