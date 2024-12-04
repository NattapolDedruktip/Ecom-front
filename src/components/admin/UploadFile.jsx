import { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { Loader } from "lucide-react";

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
                setLoading(false);
                toast.success("Upload Image success!");
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const hdlDelete = (public_id) => {
    const images = form.images;
    console.log(public_id);
    removeFiles(token, public_id)
      .then((res) => {
        console.log("res", res);
        const filterImages = images.filter((item, index) => {
          console.log(item);
          return item.public_id !== public_id;
        });
        console.log("filterImages", filterImages);
        setForm({
          ...form,
          images: filterImages,
        });
        toast.error(res.data);
      })
      .catch((err) => console.log("err", err));
  };
  //   console.log("form", form);
  return (
    <div>
      <div className="my-4">
        <div className="flex mx-4 gap-4 my-4">
          {/* add Loading */}
          {isLoading && <Loader className="w-16  h-16 animate-spin" />}

          {form?.images?.map((item, index) => (
            <div className="relative" key={index}>
              <img src={item.url} className="w-24 h-24 hover:scale-105" />
              <span
                className="absolute top-0 right-0 bg-red-200 p-1 rounded"
                onClick={() => hdlDelete(item.public_id)}
              >
                X
              </span>
            </div>
          ))}
        </div>
      </div>
      <input type="file" name="images" multiple onChange={hdlOnChange} />
    </div>
  );
};
export default UploadFile;
