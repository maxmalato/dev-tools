import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ButtonBackShared() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/')}
            className="p-4 bg-gray-200 hover:bg-[#26a8ed] hover:text-white rounded-full transition-colors cursor-pointer mb-4"
            aria-label="Voltar para página inicial"
        >
            <ArrowLeft size={20} />
        </button>
    );
}