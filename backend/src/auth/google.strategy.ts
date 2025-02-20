import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      scope: ["email", "profile"],
      passReqToCallback: true,
    });
  }

  async validate(
    request: any, 
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    console.log("Google OAuth Response:", profile); 
    if (!profile || !profile.emails || !profile.photos || !profile.name) {
      console.error("Invalid Google profile response:", profile);
      return done(
        new InternalServerErrorException("Invalid Google OAuth response"),
        false
      );
    }

    const user = {
      email: profile.emails?.[0]?.value || "",
      firstName: profile.name?.givenName || "",
      lastName: profile.name?.familyName || "",
      picture: profile.photos?.[0]?.value || "",
      accessToken,
    };

    return done(null, user);
  }
}
