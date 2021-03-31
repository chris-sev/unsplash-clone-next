import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next");

export default function UploadModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // open the modal
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      {/* the button to open the modal */}
      <button
        onClick={openModal}
        className="py-2.5 px-6 bg-white text-gray-700 rounded-full focus:outline-none focus:bg-yellow-300"
      >
        Upload Your Image
      </button>

      {/* the modal itself that will pop open */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Upload Your Photo Modal"
        className="absolute top-20 left-20 right-20 bottom-20 bg-white border-gray-100 shadow-2xl p-10 rounded-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <button onClick={closeModal} className="absolute top-10 right-10">
          Close
        </button>

        <div className="flex flex-col h-full">
          <h2 className="flex-shrink text-4xl font-extrabold mb-7">
            Upload Your Photo
          </h2>
          <UploadDropzone />
        </div>
      </Modal>
    </>
  );
}

function UploadDropzone(props) {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop(acceptedFiles) {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  function handleSubmit(e) {
    e.preventDefault();
  
    // Got the code from 
    // https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#upload-file-during-entry-creation
    // and switched it to fetch, since we were using that during the livestream. 
    const formData = new FormData();
  
    const formElements = document.getElementById("upload-form").elements;
    const data = {};
  
    for (let i = 0; i < formElements.length; i++) {
      const currentElement = formElements[i];
      if (!['submit', 'file'].includes(currentElement.type)) {
        data[currentElement.name] = currentElement.value;
      } else if (currentElement.type === 'file') {
        if (currentElement.files.length === 1) {
          const file = currentElement.files[0];
          formData.append(`files.${currentElement.name}`, file, file.name);
        } else {
          for (let i = 0; i < currentElement.files.length; i++) {
            const file = currentElement.files[i];
  
            formData.append(`files.${currentElement.name}`, file, file.name);
          }
        }
      }
    }
  
    formData.append('data', JSON.stringify(data));
  
    fetch("http://localhost:1337/photos", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <form className="h-full flex flex-col" id="upload-form" onSubmit={handleSubmit}>
      {/* this is the dropzone */}
      <div
        {...getRootProps({
          className:
            "relative flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg py-5 px-10 text-center bg-gray-100 text-gray-600 cursor-pointer hover:bg-blue-100 hover:border-blue-400 hover:text-blue-700 transition duration-200",
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>

        {/* image preview */}
        <div className="absolute right-3 bottom-3">
          {files.map((file, index) => (
            <img
              src={file.preview}
              key={index}
              className="w-72 rounded-lg shadow-2xl"
            />
          ))}
        </div>
      </div>

      {/* submit button */}
      <button
        type="submit"
        className="mt-8 flex-shrink w-full bg-blue-400 text-blue-50 text-xl py-4 px-20 rounded-lg font-medium"
      >
        Upload
      </button>
    </form>
  );
}
