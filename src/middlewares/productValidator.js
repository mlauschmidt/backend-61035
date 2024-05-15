const dataValidator = (req, res, next) => {
    const data = req.body;
    data.price = parseFloat(data.price) || '';
    data.code = parseInt(data.code) || '';
    data.stock = parseInt(data.stock) || '';

    const keys = [
        'title',
        'category',
        'description',
        'price',
        'code',
        'stock'
    ]

    for (let key of keys){
        if (!(key in data) || data[key] === '') {
            return res.status(400).json({ msg: `Todos los campos son obligatorios` });
        }
    }

    next();
}

module.exports = dataValidator;
