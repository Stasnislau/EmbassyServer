import * as visaApplicationService from "./visaApplication.service";

import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

export const visaApplicationRouter = express.Router();

visaApplicationRouter.get(
  "/visa-applications/:id",
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const visaApplication = await visaApplicationService.getVisaApplicationById(
      Number(id)
    );
    res.json(visaApplication);
  }
);

visaApplicationRouter.post(
  "/visa-applications",
  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ errors: Errors.array() });
    }
    try {
      const visaApplication =
        await visaApplicationService.createVisaApplication(userId, req.body);
      res.json(visaApplication);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
);

visaApplicationRouter.put(
  "/visa-applications/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, ...rest } = req.body;
    const visaApplication = await visaApplicationService.updateVisaApplication(
      Number(id),
      rest
    );
    res.json(visaApplication);
  }
);
