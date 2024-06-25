const userValidator = (req, res, next) => {
    const data = req.body;
    data.age = parseFloat(data.age) || '';

    const keys = [
        'name',
        'lastname',
        'username',
        'email',
        'age',
        'password'
    ]

    for (let key of keys){
        if (!(key in data) || data[key] === '') {
            return res.status(400).json({ msg: `Todos los campos son obligatorios` });
        }
    }

    next();
}

module.exports = userValidator;
