import { useState } from "react";

interface props {
    text: string;
    maxLength: number;
}

const ReadMoreComponent: React.FC<props> = ({ text, maxLength }) => {
    const [isReadMore, setIsReadMore] = useState(true);
  
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
  
    const renderText = () => {
      if (!text || typeof text !== 'string') {
        return '';
      }  

      if (isReadMore) {
        return text.length > maxLength ? text.substring(0, maxLength) : text;
      } else {
        return text;
      }
    };
  
    return (
      <div>
        <p>{renderText()}</p>
        {text && text.length > maxLength && (
          <button className="mt-1 font-bold text-gray-400 dark:text-gray-300" onClick={toggleReadMore}>
            {isReadMore ? 'Read More' : 'Read Less'}
          </button>
        )}
      </div>
    );
  };
  
  export default ReadMoreComponent;