const {User} = require("../models/Models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const generateJTW = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class UserController{
    async registration(req, res){
        try{
            const {login, role, password} = req.body
            if(!login || !password){
                return res.json({message:"Введите логин и пароль"})
            }
            const condidate = await User.findOne({login:login})
            if (condidate) {
                return res.json({message:"Пользователь с таким именем уже существует"})
            }
            const hashPassword = await bcrypt.hash(password, 5)
            let userRole = "USER";
            if(role){
                userRole = role
            }
            const user = new User({login:login,role:userRole, password: hashPassword})
            await user.save()
            const token = generateJTW(user.id, user.login, user.role)
            return res.json({token})
        }
        catch(e){
            res.json({message:e.message})
        }
    }
    async login(req, res){
        const {login, password} = req.body
        const user = await User.findOne({login:login})
        if (!user) {
            return res.json({message:"Такого пользователя не существует"})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.json({message:"Неверный пароль"})
        }
        const token = generateJTW(user.id, user.login, user.role)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJTW(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }
}


module.exports = new UserController()