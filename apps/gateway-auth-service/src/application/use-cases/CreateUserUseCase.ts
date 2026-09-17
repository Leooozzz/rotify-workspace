import { Users } from "../../domain/entities/Users";
import { CompanyMember } from "../../domain/entities/CompanyMember";
import { ForbiddenError } from "../../domain/errors/ForbiddenError";
import { UserAlreadyExistsError } from "../../domain/errors/UserAlreadyExistsError";
import { IUsersRepository } from "../../domain/repositories/IUsersRepository";
import { ICompanyMembersRepository } from "../../domain/repositories/ICompanyMembersRepository";
import { IHashProvider } from "../providers/IHashProvider";
import { IAuthContext } from "../../shared/types/auth";

export interface ICreateUserRequest {
    name:string;
    email:string;
    password:string;
}

export class CreateUserUseCase {
    constructor(
        private usersRepository:IUsersRepository,
        private hashProvider:IHashProvider,
        private companyMembersRepository:ICompanyMembersRepository,
    ){}

    async execute(auth:IAuthContext, data:ICreateUserRequest):Promise<{user:Users}>{
        if (auth.role === "ADMIN" || auth.companyRole !== "OWNER" || !auth.companyId) {
            throw new ForbiddenError();
        }

        const email = data.email.trim().toLowerCase();

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
                companyId: auth.companyId,
                role: "MEMBER",
            })
        );

        return { user };
    }
}
