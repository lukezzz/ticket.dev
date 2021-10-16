import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { siginRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(currentUserRouter);
app.use(siginRouter);
app.use(signoutRouter);
app.use(signupRouter);

const wait = async (ms: number) => {
    return new Promise((resolve) =>
        setTimeout(() => {
            console.log("running");
            return resolve;
        }, ms)
    );
};

app.all("*", async (req, res) => {
    console.log("before await", new Date());
    await wait(5 * 1000);
    console.log("after await", new Date());
    throw new NotFoundError();
});

app.use(errorHandler);


export { app }
