import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from 'react';
library.add(fas, far);

interface Props {
    rating: number;
    maxStars: number;
}

const StarRating: FC<Props> = ({ rating, maxStars = 5 }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      if (i <= rating) {
        stars.push(<FontAwesomeIcon key={i} icon={['fas','star']} className="text-yellow-400" />);
      } else if (i - rating < 1) {
        stars.push(<FontAwesomeIcon key={i} icon={['fas','star-half-stroke']} className="text-yellow-400" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={['far','star']} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default StarRating;
