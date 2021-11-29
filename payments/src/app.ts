import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@luketickets/common";
import { createChargeRouter } from "./routers/new";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",
    })
);
app.use(currentUser);

app.use(createChargeRouter);

const wait = async (ms: number) => {
    return new Promise((resolve) =>
        setTimeout(() => {
            console.log("running");
            return resolve;
        }, ms)
    );
};

app.all("*", async (req, res) => {
    // console.log("before await", new Date());
    // await wait(5 * 1000);
    // console.log("after await", new Date());
    console.log(req);
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
