import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}
    
    async CreateUser(createUserDto: CreateUserDto): Promise<UserEntity>{
        const saltOrRounds = 10;
        
        const newPasswordHash = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: newPasswordHash
        })
    }

    async getAllUser(): Promise<UserEntity[]>{
        return this.userRepository.find()
    }

}
