export const convertUrlString = (url) => {
    return url.trim().toLowerCase().replaceAll(" ", "-");
}