import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

library.add(fas, far);

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
    setAnimate(true);
  };

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 600); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <button
      className={`${isLiked ? 'text-blue-500' : 'text-gray-950 dark:text-white'} ${animate ? 'animate-beat' : ''}`}
      onClick={handleClick}
    >
      {isLiked ? <FontAwesomeIcon icon={['fas', 'thumbs-up']} size='lg' /> : <FontAwesomeIcon icon={['far', 'thumbs-up']} size='lg' /> }
    </button>
  );
};

export default LikeButton;
