import { FC } from "react";

interface NameInitialsProps {
    name: string
}

const NameInitials: FC<NameInitialsProps> = ({ name }) => {
    const getInitials = (name: string): string => {
        const words = name.split(' ');
        const firstTwoWords = words.slice(0, 2);
        const initials = firstTwoWords.map(word => word[0]).join('');

        return initials;
    };

    return (
        <div>
            <span>{getInitials(name)}</span>
        </div>
    );
}

export default NameInitials;