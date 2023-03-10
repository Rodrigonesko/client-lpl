const config = {
    headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` }
}

export default config