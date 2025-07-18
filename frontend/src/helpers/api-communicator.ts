import axios from "axios";
export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password }, {
        withCredentials: true
    });
    if(res.status !== 200){
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
};

export const signupUser = async (name:string,email: string, password: string) => {
    const res = await axios.post("/user/signup", { name, email, password }, {
        withCredentials: true
    });
    if(res.status !== 201){
        throw new Error("Unable to Signup");
    }
    const data = await res.data;
    return data;
};


export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status", { withCredentials: true });
    if(res.status !== 200){
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};



export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message }, {
    withCredentials: true
  });
  if(res.status !== 200){
    throw new Error("Unable to send chat");
  }
  return res.data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats", {
    withCredentials: true
  });
  if(res.status !== 200){
    throw new Error("Unable to send chat");
  }
  return res.data;
};


export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete", {
    withCredentials: true
  });
  if(res.status !== 200){
    throw new Error("Unable to delete chats");
  }
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout", {
    withCredentials: true
  });
  if(res.status !== 200){
    throw new Error("Unable to delete chats");
  }
  return res.data;
};

