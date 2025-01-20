import { useEffect, useState } from "react";
import style from "./Header.module.scss";

export const Header = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const url = "https://api.mediehuset.net/mediesuset/images";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImages(data);
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    images && images.items && images.items[5] && (
      <div
        className={style.Header}
        style={{
          backgroundImage: `url(${images.items[4].image})`,
        }}
      >
        
      </div>
    )
  );
};
