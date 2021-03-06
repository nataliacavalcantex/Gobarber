import {Model, Sequelize} from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model{
    static init(sequelize){
        super.init({
            name:Sequelize.STRING,
            email:Sequelize.STRING,
            password:Sequelize.VIRTUAL ,//so existe nio codigo
            password_hash:Sequelize.STRING,
            provider:Sequelize.BOOLEAN,
            
        },{
            sequelize,
            
        })
        this.addHook('beforeSave',async user =>{
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password,8)
            }
        }) //trigger
        return 'User registred sucessfully'
    }
    static associate(models){
        this.belongsTo(models.File,{foreignKey:'avatar_id',as:'avatar'})
    }
    checkPassword(password){
        return bcrypt.compare(password,this.password_hash)
    }
}

export default User