import { posts } from "./dummydata/posts";

export const getPostsByLimit = (limit) => {
    return { data: posts.slice(0, 5) }
}