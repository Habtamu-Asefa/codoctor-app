import SpecialityCard from "./SpecialityCard";

const ScrollableSection = () => {
    const cards = [
        { id: 1, text: 'Pediatrics', bgColor: 'bg-blue-300' },
        { id: 2, text: 'Oncologist', bgColor: 'bg-blue-300' },
        { id: 3, text: 'Neurologist', bgColor: 'bg-blue-300' },
        { id: 4, text: 'Gynacologist', bgColor: 'bg-blue-300' },
        { id: 5, text: 'Ortopidics', bgColor: 'bg-blue-300' },
        { id: 6, text: 'Terasic', bgColor: 'bg-blue-300' },
    ];

    return (
        <div className="overflow-x-auto py-4 scrollbar-hide">
            <div className="flex space-x-4">
                {cards.map((Card) => (
                    <SpecialityCard key={Card.id} text={Card.text} bgColor={Card.bgColor} />
                ))}
            </div>
        </div>
    );
};

export default ScrollableSection;
