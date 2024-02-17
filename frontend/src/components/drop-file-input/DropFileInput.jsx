import { useRef, useState } from "react";
import PropTypes from "prop-types";
import "boxicons";

import "./drop-file-input.css";

import uploadImg from "../../assets/cloud-upload-regular-240.png";
import audioIcon from "../../assets/file-audio-solid-240.webp";
import { storage } from "../../../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Link } from "react-router-dom";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const [loading, setLoading] = useState(false);

  const onFileDrop = async (e) => {
    const newFile = e.target.files[0];

    if (newFile) {
      setLoading(true); // Set loading to true

      const storageRef = ref(storage, newFile.name);

      await uploadBytes(storageRef, newFile)
        .then(() => {
          console.log("Uploaded a blob or file!");
        })
        .catch((err) => {
          console.log(err);
        });

      await getDownloadURL(storageRef)
        .then((url) => {
          const updatedList = [...fileList, { file: newFile, url }];
          setFileList(updatedList);
          props.onFileChange(updatedList);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false); // Set loading back to false after upload is complete
    }
  };

  const fileRemove = (item) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(item), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);

    const desertRef = ref(storage, item.file.name);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("file deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showDiv, setShowDiv] = useState(false);
  const handleCopyAudio = (url) => {
    navigator.clipboard
      .writeText(
        `
        <audio src=${url} controls></audio>
    `
      )
      .then(() => {
        console.log("URL copied to clipboard");
        setShowDiv(true);
        setTimeout(() => {
          setShowDiv(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="box w-[60vw] text-center">
        <h2 className="header">drag and drop a audio or click to upload it</h2>
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="drop-file-input__label m-auto w-full">
            <img src={uploadImg} alt="" />
            <p>Drag & Drop your audios here</p>
          </div>
          <input type="file" value="" onChange={onFileDrop} />
        </div>
        {/* display loading */}
        <p className="drop-file-preview__title">Ready to upload</p>
        {loading && (
          <div
            className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
        {fileList.length > 0 ? (
          <div className="drop-file-preview">
            {fileList.map((item, index) => (
              <div key={index}>
                <div className="drop-file-preview__item">
                  <div>
                    <img src={audioIcon} alt="audio icon" />
                  </div>
                  <div className="drop-file-preview__item__info mr-16">
                    <p>{item.file.name}</p>
                  </div>
                  <div className="mx-3">
                    <span
                      className="drop-file-preview__item__copy"
                      onClick={() => handleCopyAudio(item.url)}
                    >
                      <box-icon name="copy" type="solid" color="gray"></box-icon>
                    </span>
                    <span
                      className="drop-file-preview__item__del"
                      onClick={() => fileRemove(item)}
                    >
                      <box-icon
                        name="trash-alt"
                        type="solid"
                        color="gray"
                      ></box-icon>
                    </span>
                  </div>
                </div>
                <div className="editor">
                  <Sandpack
                    files={{
                      "index.html": {
                        code: `
                          <audio src=${item.url} controls></audio>
                        `,
                        language: "html",
                      },
                    }}
                    theme="auto"
                    template="static"
                  />
                </div>
              </div>
            ))}

            {showDiv && (
              <div className="flex gap-2 rounded  fixed left-2 bottom-2 p-4 bg-black text-white">
                <box-icon
                  type="solid"
                  name="check-circle"
                  color="green"
                ></box-icon>
                <p>URL copied to clipboard</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
      
      <div className="links text-center mt-16">
        <Link to='/privacyPolicy'>Privacy policy</Link>
        <span className="text-lg">.</span>
        <Link to='/TermsOfService'>Terms of service</Link>
      </div>
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
