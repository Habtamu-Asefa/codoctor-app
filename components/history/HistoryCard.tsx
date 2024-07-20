

interface HistoryCardProps {
    description: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ description }) => {
    return (
        <div className="bg-blue-100 p-4 rounded-lg m-2 ">
            <p className=" font-sans font-light text-lg text-gray-600 flex justify-center">{description}</p>
        </div>
        
   
    );
};

export default HistoryCard;