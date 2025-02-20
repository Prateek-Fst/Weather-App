import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Response } from "express"
import * as jwt from "jsonwebtoken"

@Controller("auth")
export class AuthController {
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    if (!req.user) {
      return res.redirect("http://localhost:3000") 
    }

    const token = jwt.sign(
      { email: req.user.email, firstName: req.user.firstName, picture: req.user.picture },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`)

  }
}

  