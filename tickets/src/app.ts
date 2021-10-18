import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@luketickets/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",
    })
);

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

export { app };
