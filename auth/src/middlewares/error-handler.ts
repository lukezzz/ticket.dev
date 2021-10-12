import { Request, Response, NextFunction } from "express";
// import { DatabaseConnectionError } from "../errors/database-connection-error";
// import { RequestValidationError } from "../errors/request-validation-error";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // console.log("something went wrong", err);

    // if (err instanceof RequestValidationError) {
    //     // console.log("handling this error as a request validation error");
    //     // const formattedErrors = err.errors.map((error) => {
    //     //     return { message: error.msg, field: error.param };
    //     // });

    //     return res
    //         .status(err.statusCode)
    //         .send({ errors: err.serializeErrors() });
    // }

    if (err instanceof CustomError) {
        // console.log("handling this error as database validation error");
        // return res.status(500).send({
        //     errors: [{ message: err.reason }],
        // });
        return res
            .status(err.statusCode)
            .send({ errors: err.serializeErrors() });
    }

    console.error(err);

    res.status(400).send({
        errors: [
            {
                message: "Something went wrong",
            },
        ],
    });
};
