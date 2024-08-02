import { threads } from "./dummydata/threads";

export const getThreadsByLimit = (limit) => {
    return { data: threads.slice(0, limit) };
}