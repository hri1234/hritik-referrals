import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector , useDispatch} from 'react-redux';
import { incrementPoints } from '../features/points/pointsSlice';

const Referral = ({ name }) => {
  const [referralLink, setReferralLink] = useState('');
  const [point, setPoints] = useState(localStorage.getItem('referralPoints') || 0);
  const points = useSelector((state) => state.points.value);
  const dispatch = useDispatch()
  useEffect(() => {
    const generateReferralLink = async () => {
      const { data } = await axios.post('http://localhost:5000/api/generate-referral-link', {
        name,
      });
      setReferralLink(data.referralLink);
    };
 
    generateReferralLink();
  }, [name]);

  const handleShare = () => {
    const newPoints = parseInt(points, 10) + 5;
    localStorage.setItem('referralPoints', newPoints);
    setPoints(newPoints);
    dispatch(incrementPoints());
  };

  return (
    <div>
      <h2>Referral System</h2>
      <p>
        Share this link with your friends to earn 5 points:{' '}
        <a href={referralLink} onClick={handleShare} target="_blank" rel="noopener noreferrer">
          {referralLink}
        </a>
      </p>
      <p>Your current points: {points}</p>
    
    </div>
  );
};

export default Referral;