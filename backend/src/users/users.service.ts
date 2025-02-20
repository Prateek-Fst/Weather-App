import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { User } from "./user.schema"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOrCreate(userData: any): Promise<User> {
    let user = await this.userModel.findOne({ email: userData.email })
    if (!user) {
      user = new this.userModel(userData)
      await user.save()
    }
    return user
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async toggleUserStatus(id: string): Promise<User> {
    const user = await this.userModel.findById(id)
    
    if (!user) {
      throw new Error('User not found')
    }
  
    user.isEnabled = !user.isEnabled
    return user.save()
  }
  
}

