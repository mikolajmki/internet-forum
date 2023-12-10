export const optimizeThread = (thread) => {
    return { _id: thread._id, author: thread.author._id, description: thread.description, images: thread.images }
}

export const optimizeUser = (user) => {
    return { _id: user._id, username: user.username, firstname: user.firstname, lastname: user.lastname, email: user.email, signature: user.signature, about: user.about };
}

export const optimizePost = (post) => {
    return { _id: post._id, author: post.author._id, comment: post.comment, images: post.images }
}