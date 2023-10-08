import "./EnlargeImage.css";

export const EnlargeImage = ({ url }) => {


    const toggleFullScreen = () => {
      setIsFullScreen(!isFullScreen);
    }
    const imgClassName = isFullScreen
    ? "storyImage full-screen"
    : "storyImage"

    return (
      <div className={imgClassName}>
        <img
          src={url}
          alt="Story Image"
          onClick={toggleFullScreen}
        />
      </div>
    );
  }
