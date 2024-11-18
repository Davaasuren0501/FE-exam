const errorHandler = (err, req, res, next) => {

    const error = { ...err };

    error.message = err.message;

    res.status(err.statusCode || 500).json(
        {
            success: false
            , message: error
        }
    );
};

module.exports = errorHandler;
