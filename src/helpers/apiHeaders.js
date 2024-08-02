export default function apiHeaders(token) {
    return { headers: { Authorization: "Bearer " + token  } }
}