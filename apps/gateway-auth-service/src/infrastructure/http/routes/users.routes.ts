import { Router } from "express";
import { signupController } from "../controllers/signupController";
import { signinController } from "../controllers/signinController";
import { meController } from "../controllers/meController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { singoutController } from "../controllers/singoutController";
import { refreshController } from "../controllers/refreshController";
import { listUsersController } from "../controllers/listUsersController";
import { listUserByCompanyIdController } from "../controllers/listUserByCompanyIdController";

const usersRoutes = Router();

usersRoutes.post("/signup", signupController);
usersRoutes.post("/signin", signinController);
usersRoutes.post("/refresh", refreshController);
usersRoutes.post("/signout", singoutController);

usersRoutes.get("/me", ensureAuthenticated, meController);
usersRoutes.get("/", ensureAuthenticated, listUsersController);
usersRoutes.get("/:companyId",ensureAuthenticated,listUserByCompanyIdController)

export { usersRoutes };