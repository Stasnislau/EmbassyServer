import { VisitInterface } from "../Interfaces";
import { embassyDB } from "../utils/db.server";

export const getVisitById = async (id: number): Promise<VisitInterface> => {
  const visit = await embassyDB.visits.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      date: true,
      time: true,
      location: true,
      description: true,
      userId: true,
    },
  });

  if (!visit) {
    throw new Error("Visit not found");
  }

  return visit;
};

export const getVisitsByUserId = async (
    userId: number
    ): Promise<VisitInterface[]> => {
    const visits = await embassyDB.visits.findMany({
        where: {
            userId: Number(userId),
        },
        select: {
            date: true,
            time: true,
            location: true,
            description: true,
            userId: true,
        },
    });

    if (!visits) {
        throw new Error("Visits not found");
    }
    return visits;
};

export const createVisit = async (
  visit: VisitInterface
): Promise<VisitInterface> => {
  return await embassyDB.visits.create({
    data: {
      date: visit.date,
      time: visit.time,
      location: visit.location,
      description: visit.description,
      userId: visit.userId,
    },
  });
};


