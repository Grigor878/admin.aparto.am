import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { API_BASE_URL } from "../../../../services/api/config";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const FullScreenSlider = ({
  startIndex,
  setStartIndex,
  images,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex || 0);

  const formattedImages = images?.map((item) => ({
    original: `${API_BASE_URL}/images/${item.name}`,
    thumbnail: `${API_BASE_URL}/images/${item.name}`,
  }));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.fullScreenSlider}>
      <div className={styles.imageCount}>
        {currentIndex + 1} / {formattedImages.length}
      </div>
      <ImageGallery
        lazyLoad={true}
        items={formattedImages}
        startIndex={startIndex}
        showPlayButton={false}
        showFullscreenButton={true}
        // onSlide={(index) => setStartIndex(index)}
        onSlide={(index) => {
          setStartIndex(index);
          setCurrentIndex(index);
        }}
        infinite={false}
      />
      <button
        className={styles.fullScreenSlider_closeBtn}
        type="button"
        onClick={onClose}
        aria-label="close"
        title="close"
      >
        Փակել
      </button>
    </div>
  );
};
