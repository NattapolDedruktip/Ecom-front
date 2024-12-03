import { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";

const UploadFile = ({ form, setForm }) => {
  //   console.log(form, setForm);
  const token = useEcomStore((state) => state.token);
  const [isLoading, setLoading] = useState(false);

  const hdlOnChange = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      let allFiles = form.images; // empty []
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);

        //validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not picture`);
          continue;
        }

        //image resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success("Upload Image success!");
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };
  return (
    <div>
      <input type="file" name="images" multiple onChange={hdlOnChange} />
    </div>
  );
};
export default UploadFile;
