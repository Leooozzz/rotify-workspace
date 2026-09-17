import { Router } from "express";
import { signupController } from "../controllers/signupController";
import { signinController } from "../controllers/signinController";
import { meController } from "../controllers/meController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { singoutController } from "../controllers/singoutController";

const usersRoutes = Router();

usersRoutes.post("/signup", signupController);
usersRoutes.post("/signin", signinController);

usersRoutes.get("/me", ensureAuthenticated, meController);
usersRoutes.post("/signout", ensureAuthenticated, singoutController);

export { usersRoutes };
