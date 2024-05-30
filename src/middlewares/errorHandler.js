const errorHandler = (error, req, res, next) => {
    console.log( `${error.stack}`); 
    const status = error.status || 500;

    res.status(status).send({msg: error.message});
}

module.exports = errorHandler;