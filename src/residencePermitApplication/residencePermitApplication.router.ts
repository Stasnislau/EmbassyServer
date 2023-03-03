import * as ResidencePermitApplicationService from "./residencePermitApplication.service";

import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

export const residencePermitApplicationRouter = express.Router();

residencePermitApplicationRouter.get(
  "/residence-applications/:id",
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const residencePermitApplication =
      await ResidencePermitApplicationService.getResidencePermitApplicationById(
        Number(id)
      );
    res.json(residencePermitApplication);
  }
);

residencePermitApplicationRouter.get(
  "/residence-applications/users/:userId",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const residencePermitApplications =
      await ResidencePermitApplicationService.getResidencePermitApplicationsByUserId(
        Number(userId)
      );
    res.json(residencePermitApplications);
  }
);

residencePermitApplicationRouter.post(
  "/residence-applications",
  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ errors: Errors.array() });
    }
    try {
      const residencePermitApplication =
        await ResidencePermitApplicationService.createResidencePermitApplication(
          req.body,
          userId
        );
      res.json(residencePermitApplication);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
);

residencePermitApplicationRouter.put(
  "/residence-applications/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, ...rest } = req.body;
    const residencePermitApplication =
      await ResidencePermitApplicationService.updateResidencePermitApplication(
        Number(id),
        rest
      );
    res.json(residencePermitApplication);
  }
);
