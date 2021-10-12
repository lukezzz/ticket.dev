import express, { Response, Request } from "express";
import { body } from "express-validator";
// import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-requests";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
    "/api/users/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("You must supply a passowrd"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     throw new RequestValidationError(errors.array());
        // }
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError("Invalid credentials");
        }

        // compare passowrd
        const passwordsMatch = await Password.compare(
            existingUser.password,
            password
        );

        if (!passwordsMatch) {
            throw new BadRequestError("Invalid crendentials");
        }

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!
        );

        // Store it on session object
        req.session = {
            jwt: userJwt,
        };

        res.status(200).send(existingUser);
    }
);

export { router as siginRouter };
