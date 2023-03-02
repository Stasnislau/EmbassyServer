import { VisitInterface } from "../Interfaces";
import { prisma } from "../utils/db.server";

const handleSubmittedVisit = (visit: VisitInterface) => {
    // go through the users database and check if the user exists
    // if the user exists, add the visit to the user's visits
    // if the user doesn't exist, throw an exception
    // return the visit
    
    prisma 

}
