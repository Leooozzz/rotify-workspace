import { Router } from "express";
import { signupController } from "../controllers/signupController";
import { signinController } from "../controllers/signinController";
import { meController } from "../controllers/meController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

usersRoutes.post("/signup", signupController);
usersRoutes.post("/signin", signinController);
usersRoutes.get("/me", ensureAuthenticated, meController);

export { usersRoutes };
