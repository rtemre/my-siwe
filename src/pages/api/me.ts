import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  console.log("request data ===> ", req.session);

  switch (method) {
    case "GET":
      res.send({ address: req.session.siwe?.data.address });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
const ironOptions = {
  cookieName: "siwe",
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export default withIronSessionApiRoute(handler, ironOptions);
