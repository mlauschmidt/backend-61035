const dataValidator = (req, res, next) => {
    const data = req.body;
    const keys = [
        'title',
        'description',
        'code',
        'price',
        'stock',
        'category'
    ]

    for (let key of keys){
        if (!(key in data)){
            return res.status(400).json({ msg: `Todos los campos son obligatorios` });
        }
    }

    next();
}

module.exports = dataValidator;