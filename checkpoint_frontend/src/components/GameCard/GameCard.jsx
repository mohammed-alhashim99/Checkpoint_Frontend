import sendRequest from '../../utilities/sendRequest';

export default function GameCard({ game }) {
  const handleAdd = async () => {
    const newGame = {
      game_name: game.name,
      release_date: game.released,
      rating: game.rating,
      platform: game.platforms.join(', '),
      image_url: game.image,
    };

    try {
      await sendRequest('/games/', 'POST', newGame);
      alert('Game added!');
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  return (
    <div className="game-card">
      <img src={game.image} alt={game.name} />
      <h3>{game.name}</h3>
      <p>Released: {game.released}</p>
      <p>Rating: {game.rating}</p>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
