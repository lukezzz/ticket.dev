import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[];
        }
    }
}

jest.mock("../nats-wrapper");

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = "test";
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    // buid a JWT payload. { id, email}
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com",
    };
    // create the JWT!

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // build session object. { jwt: MY_JWT}
    const session = { jwt: token };

    // turn the session into JSON
    const sessionJSON = JSON.stringify(session);

    // take JSON end encode it as base64
    const base64 = Buffer.from(sessionJSON).toString("base64");

    // return a stirng that a cookie with encoded data
    return [`express:sess=${base64}`];
};
