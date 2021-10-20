import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@luketickets/common";
import { createTicketRouter } from "./routers/new";
import { showTicketRouter } from "./routers/show";
import { indexTicketRouter } from "./routers/index";
import { updateTicketRouter } from "./routers/update";

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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

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
