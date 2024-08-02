import { forums } from "./dummydata/forums"

export const getForumById = (id) => {
    console.log("ids",  id)
    console.log("forums", forums.find((x) => x._id.$oid == id.$oid))
    return { data: forums.find((x) => x._id.$oid == id) }
}