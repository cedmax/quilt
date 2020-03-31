import { useRef, useEffect, useCallback } from "react";
import { Rotate, Flip, Brightness, Contrast, Uppload, en, Local, Instagram, Pinterest, Facebook, Crop } from "uppload";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";

export default ({ addTile, children, onClose }) => {
  let uppload = useRef();

  useEffect(() => {
    uppload.current = new Uppload({
      lang: en,
      maxSize: [100, 100],
      compression: 0.8,
      compressionToMime: "image/webp",
      uploader: (file, updateProgress) =>
        new Promise(resolve => {
          const reader = new FileReader();
          setTimeout(() => {
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(file);
          }, 4000);

          let progress = 0;
          const interval = setInterval(() => {
            if (progress > 99) clearInterval(interval);
            updateProgress(progress++);
          }, 30);
        })
    });

    uppload.current.use([
      new Local(),
      new Instagram(),
      new Pinterest(),
      new Facebook(),
      new Crop({ aspectRatio: 1, hideAspectRatioSettings: true }),
      new Rotate(),
      new Flip(),
      new Brightness(),
      new Contrast()
    ]);

    uppload.current.on("upload", addTile);
    !!onClose && uppload.current.on("close", onClose);
  }, [addTile, onClose]);

  const onOpen = useCallback(() => {
    uppload.current.open();
  }, []);

  return children({ onOpen });
};
