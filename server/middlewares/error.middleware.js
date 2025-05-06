module.exports = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'ZodError') {
        return res.status(500).json({error: err.status}); 
    }
    res.status(500).json({error: 'Error interno do server'});
}