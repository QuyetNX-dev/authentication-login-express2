const db = require('../db.js')
module.exports.validateLogin = (req, res, next) => {
    let errors = [];

    
    if(!req.body.email){
        errors.push('Bạn chưa nhập tài khoản')
    }
    if(!req.body.password){
        errors.push('Bạn chưa nhập mật khẩu')
    }
    if(errors.length){
        res.render('authentication/login',{
            errors: errors,
            values: req.body
        })
        return;
    }

    const user = db.get('users').find({email: req.body.email}).value()

    if(!user){
        errors.push('Tài khoản không đúng')
        res.render('authentication/login',{
            errors: errors,
            values: req.body
        })
        return;
    }
    if(user.password !== req.body.password){
        errors.push('Mật khẩu không đúng')
        res.render('authentication/login',{
            errors: errors,
            values: req.body
        })
        return;
    }
    res.cookie('userId',user.id)
    res.redirect('/transection')
}