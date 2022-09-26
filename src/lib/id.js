const { v4: uuidv4 } = require("uuid")

// creates a new uuidv4 key
exports.createNewHashKey = () => uuidv4()

// verifies if the hash key is a uuidv4
exports.verifyHashKey = (uuid) => {
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    return regexExp.test(uuid)
}
