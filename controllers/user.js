import { User } from "../models/user.js";

export async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name: name,
    email: email,
    password: password,
  });

  return res.render("home");
}
