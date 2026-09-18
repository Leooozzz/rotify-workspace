import { CompanyMember } from "../../domain/entities/CompanyMember";
import { Users } from "../../domain/entities/Users";
import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { UserAlreadyExistsError } from "../../domain/errors/UserAlreadyExistsError";
import { ICompanyMembersRepository } from "../../domain/repositories/ICompanyMembersRepository";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { IAuthContext } from "../../shared/types/auth";
import { IHashProvider } from "../providers/IHashProvider";


export interface ICreateByCompanyIdUserRequest { 
    name:string;
    email:string;
    password:string;
    companyId:string
}

export class CreateUserByCompanyIdUseCase { 
      constructor(
            private usersRepository:IUsersRepository,
            private hashProvider:IHashProvider,
            private companyMembersRepository:ICompanyMembersRepository,
        ){}
    
        async execute (auth:IAuthContext,data:ICreateByCompanyIdUserRequest):Promise <{user:Users}>{
            if(auth.role !== "ADMIN" ){
                 throw new ForbiddenError();
            }
            const email = data.email.trim().toLowerCase()
             const userAlreadyExists = await this.usersRepository.findByEmail(email);
                    if(userAlreadyExists){
                        throw new UserAlreadyExistsError(email);
                    }
            
            const hashedPassword = await this.hashProvider.generateHash(data.password);
             const user = await this.usersRepository.create(
            new Users({
                name: data.name.trim(),
                email,
                password: hashedPassword,
                role: "USER",
            })
        );
        await this.companyMembersRepository.create(
                    new CompanyMember({
                        userId: user.id!,
                        companyId: data.companyId,
                        role: "MEMBER",
                    })
                );
        
                return { user };
        }
        
}