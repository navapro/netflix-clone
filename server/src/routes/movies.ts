import express from "express";
import Movie from "../models/Movie";
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
      const newMovie = new Movie(req.body);
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/:id", verify, async (req: RequestType, res: any) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE
router.delete("/:id", verify, async (req: RequestType, res: any) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);

      res.status(200).json("Movie is deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
router.get("/find/:id", verify, async (req: RequestType, res: any) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM
router.get("/random", verify, async (req: RequestType, res: any) => {
  const movieType = req.query.type;
  let movie = [];

  try {
    if (movieType == "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});
export default router;
