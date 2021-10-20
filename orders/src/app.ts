import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@luketickets/common";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes/index";
import { deleteOrderRouter } from "./routes/delete";

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

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

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
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
