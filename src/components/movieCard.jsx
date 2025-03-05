import {useNavigate} from 'react-router-dom';
import { MyRoutes } from '../backend/const';


const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer shadow-[0_0_10px_1px_rgba(255,255,255,0.6)] relative min-w-50 max-w-50 bg-gray-900 text-white rounded-lg overflow-hidden transition-transform transform hover:scale-105"
    onClick={()=>{
      navigate(MyRoutes.details + movie.imdbId)
    }}>
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      {/* Movie Info */}
      <div className="absolute bottom-2 left-2 right-2">
        <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
        <p className="text-xs text-gray-400">{movie.year} • {movie.type}</p>
      </div>
    </div>
  );
};

export default MovieCard;
