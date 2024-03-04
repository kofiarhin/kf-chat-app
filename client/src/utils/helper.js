import io from "socket.io-client";

// upload images
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "gzbuxpwt");
  const url = "https://api.cloudinary.com/v1_1/dlsiabgiw/image/upload";

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  const data = await response.json();
  return data.secure_url;
};

// production socket
const socket = io.connect("https://kf-chat-app.onrender.com/");
// devevlopment socket
// const socket = io.connect("http://localhost:5000");

export { socket, uploadImage };
