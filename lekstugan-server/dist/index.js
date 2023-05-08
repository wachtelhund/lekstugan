"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const router_1 = require("./routes/api/router");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
if (process.env.DB_CONNECTION_STRING !== undefined) {
    mongoose_1.default
        .connect(process.env.DB_CONNECTION_STRING)
        .then(() => {
        const app = (0, express_1.default)();
        app.use((0, helmet_1.default)());
        app.use((0, morgan_1.default)('dev'));
        app.use(express_1.default.json({ limit: '500kb' }));
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use((0, cors_1.default)());
        const PORT = process.env.PORT || 3000;
        app.use('/', router_1.router);
        const errorHandler = (err, req, res, _next) => {
            err.status = err.status || 500;
            if (req.app.get('env') !== 'development') {
                return res.status(err.status).json({
                    status: err.status,
                    message: err.message,
                });
            }
            return res.status(err.status).json({
                status: err.status,
                message: err.message,
                cause: err.cause ?
                    {
                        status: err.cause.status,
                        message: err.cause.message,
                        stack: err.cause.stack,
                    } :
                    null,
                stack: err.stack,
            });
        };
        app.use(errorHandler);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
        .catch((error) => {
        console.log(error);
    });
}
else {
    throw new Error('Missing db connection string, exiting');
}
//# sourceMappingURL=index.js.map