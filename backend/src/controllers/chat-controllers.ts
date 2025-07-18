import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureGemini } from "../config/gemini-config.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or Token malfunctioned" });
    }

    // Save user message
    user.chats.push({ role: "user", content: message });

    const genAI = configureGemini();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    });

    const response = await result.response;
    const text = response.text();

    // Save assistant's response
    user.chats.push({ role: "assistant", content: text });
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("🔥 Gemini Error:", error);
    return res.status(500).json({ message: "Something went wrong with Gemini" });
  }
};

export const sendChatsToUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if( !user ){
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
   
        return res.status(200).json({message: "OK", chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause:error.message});
    }
};

export const deleteChats = async (req:Request,res:Response,next:NextFunction) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if( !user ){
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({message: "OK" });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause:error.message});
    }
};

