import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingStarsProps {
  rating: number; 
}

function RatingStars({ rating }: RatingStarsProps) {
  const stars = Array(5).fill(false); 

  for (let i = 0; i < Math.floor(rating); i++) {
    stars[i] = true; 
  }
  if (rating % 1 !== 0) {
    stars[Math.floor(rating)] = "half"; 
  }

  return (
    <div className="flex">
      {stars.map((star, index) => (
        <span key={index} className="text-yellow-500">
          {star === true ? <FaStar /> : star === "half" ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
}

export default RatingStars;
