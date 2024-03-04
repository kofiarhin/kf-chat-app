import "./imageModal.styles.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/Navigation/navigationSlice";
import { IoMdClose } from "react-icons/io";
import { uploadImage, socket } from "../../utils/helper";

// image modal
const ImageModal = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const { isOpen } = useSelector((state) => state.navigation);
  const { username } = useSelector((state) => state.user);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const url = await uploadImage(file);

    // emit send message
    socket.emit("send_message", { type: "image", username, url });

    dispatch(closeModal());
  };
  return (
    <div id="image-modal" className={`${isOpen ? "show" : null}`}>
      <div className="content-wrapper">
        <IoMdClose className="close" onClick={() => dispatch(closeModal())} />
        <h1 className="heading center">Upload Image</h1>
        <input type="file" name="file" id="" onChange={handleFileChange} />
        <button onClick={handleUpload}>Send</button>
      </div>
    </div>
  );
};

export default ImageModal;
