import express from "express";
import List from "../models/List";
import verify from "../verifyToken";
const router = express.Router();

interface RequestType {
  user: {
    id: number;
    isAdmin: boolean;
  };
  body: {
    password: string;
  };
  params: {
    id: number;
  };
  query: any;
}
//CREATE
router.post("/", verify, async (req: RequestType, res: any) => {
  if (req.user.isAdmin) {
    try {
      const newList = new List(req.body);
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// GET LISTS
router.get("/", verify, async (req: RequestType, res: any) => {
  try {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let movieList = [];
    const aggrigateList = async (arguement: any) => {
      return await List.aggregate(arguement);
    };
    if (typeQuery) {
      if (genreQuery) {
        movieList = await aggrigateList([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        movieList = await aggrigateList([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      movieList = await aggrigateList([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(movieList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.post("/", verify, async (req: RequestType, res: any) => {
  if (req.user.isAdmin) {
    try {
      const newList = new List(req.body);
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

export default router;
