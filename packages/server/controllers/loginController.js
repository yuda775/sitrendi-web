import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Email atau Password salah",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Email atau Password salah",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      success: true,
      status: 200,
      data: {
        token,
      },
      message: "Login Berhasil",
    });
  } catch (error) {
    throw new Error(error);
  }
};
