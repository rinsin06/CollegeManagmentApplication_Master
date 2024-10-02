import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardMedia } from "@mui/material";
import collegePic1 from "../../assets/college_1.jpeg";
import collegePic2 from "../../assets/college_2.jpeg";
import collegePic3 from "../../assets/college_3.jpeg";
import collegePic4 from "../../assets/college_4.jpeg";

const Carousel = () => {
  const images = [
    {
      src: collegePic1,
      alt: "Image 1",
    },
    {
      src: collegePic2,
      alt: "Image 2",
    },
    {
      src: collegePic3,
      alt: "Image 3",
    },
    {
      src: collegePic4,
      alt: "Image 4",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "600px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Button
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        Prev
      </Button>
      <Button
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        Next
      </Button>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={images[currentIndex].src}
          alt={images[currentIndex].alt}
          sx={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </Card>
    </Box>
  );
};

export default Carousel;
