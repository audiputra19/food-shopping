import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

library.add(fas, far);

const LoveButton = () => {
  const [isLoved, setIsLoved] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setIsLoved(!isLoved);
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
      className={`${isLoved ? 'text-red-500' : 'text-gray-500'} ${animate ? 'animate-beat' : ''}`}
      onClick={handleClick}
    >
      {isLoved ? <FontAwesomeIcon icon={['fas', 'heart']} /> : <FontAwesomeIcon icon={['far', 'heart']} /> }
    </button>
  );
};

export default LoveButton;
