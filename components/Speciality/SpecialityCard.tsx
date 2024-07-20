interface CardProps {
    text: string;
    bgColor: string;
}

const SpecialityCard: React.FC<CardProps> = ({ text, bgColor }) => {
    return (
        <div className={`${bgColor} flex-shrink-0 w-48 h-16 ml-6 flex items-center justify-center rounded-lg`}>
            <span className="text-md font-bold text-white">{text}</span>
        </div>
    );
};

export default SpecialityCard;
