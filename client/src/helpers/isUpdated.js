export default function isUpdated(createdAt, updatedAt) {
    const created = new Date(createdAt);
    const updated = new Date(updatedAt);
    if (updated - created < 30) {
        return false;
    } else {
        return true;
    }
}