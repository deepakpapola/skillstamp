
import bcrypt from 'bcryptjs';
import {Student} from '../schema';


export const getUser = async ({ email, password })  => {
    Student.findOne( {email} , async (err, user)=> {
      if(err)return false;
      if(!user)return false;
      const matchPassword = await bcrypt.compare(password, user.password);
      return matchPassword === true ? user : false;
    })

}


