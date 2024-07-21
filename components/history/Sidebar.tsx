import Image from 'next/image';
import HistoryCard from './HistoryCard';

const Sidebar: React.FC = () => {

    const dummyData = [
        { id: 1, description: 'Patient with fever and cough' },
        { id: 2, description: 'Suspected COVID-19 case' },
        { id: 3, description: 'Post-surgery follow-up' },
        { id: 4, description: 'Diabetic patient consultation' },
    ];

    return (
        <div className="p-4 space-y-3 mt-2 min-h-screen">
            <div className="flex items-center space-x-6 mb-4 ml-4 border-b-2 p-2 sticky top-0  bottom-0">
                <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-sm " />
                <h1 className="text-xl font-bold text-blue-400">Co-Doctor</h1>
            </div>
            <div className=""></div>
            {dummyData.map((data) => (
                <HistoryCard key={data.id} description={data.description} />
            ))}
        </div>
    );
};

export default Sidebar;