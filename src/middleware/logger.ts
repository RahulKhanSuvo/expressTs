const logger = (req, res, next) => {
    console.log("object");
    next()
}
export default logger