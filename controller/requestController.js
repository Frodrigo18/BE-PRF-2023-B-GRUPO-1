import { findUser } from "../service/userService.js";
import { add as addRequest } from "../service/requestService.js";
import { get as getRequests } from "../service/requestService.js";


async function add(body, userid, userToken) {
  await findUser(userid, userToken);
  
  const request = await addRequest(body, userid);
  return request;
}

async function get(filterRequests) {
  const request = await getRequests(filterRequests);
  return request;
}

export { add, get};
