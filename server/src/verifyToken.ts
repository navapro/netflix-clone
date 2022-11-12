import jwt from "jsonwebtoken";

const verify = (req: any, res: any, next: any) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.ENCRYPTON_SECRET as string,
      (err: any, user: any) => {
        if (err) return res.status(401).json("token is not valid");

        req.user = user;
        next();
      }
    );
  } else {
    return res.status(401).json("you are not authenticated");
  }
};

export default verify;
