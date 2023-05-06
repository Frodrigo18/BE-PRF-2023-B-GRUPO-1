import express from "express";
import {auth, authSelf} from "../middleware/auth/auth.js";
import {addRequestValidator} from "../middleware/validator/body/addRequestValidator.js"; 
import {UserNotFoundError} from "../service/error/userNotFoundError.js";
import {add} from "../controller/requestController.js";
import { StationAlreadyExistsError } from "../service/error/stationAlreadyExistsError.js";
import { UserUnexpectedError } from "../service/error/userUnexpectedError.js";

const router = express.Router();

router.post("/:userId/requests", [auth, authSelf, addRequestValidator], async function (req, res, next) {
  let responseJson = ""
  let statusCode = 201

  try {
    const body = req.body;
    const userId = req.params.userId;
    const userToken = req.header("Authorization");
    responseJson = await add(body, userId, userToken);

  } catch (error) {
    responseJson = {message: error.message}

    if (error instanceof UserNotFoundError){
      statusCode = 404
    }
    else if (error instanceof StationAlreadyExistsError){
      statusCode = 409
    }
    else if (error instanceof UserUnexpectedError){
      statusCode = 500
    }
    else {
      statusCode = 500
    }
  }
  res.status(statusCode).json(responseJson);
});

export { router };
