import sendRequest from '../../utilities/sendRequest';

export default function GameCard({ game }) {
  const handleAdd = async () => {
    const newGame = {
      game_name: game.name,
      release_date: game.released,
      rating: game.rating,
      platform: Array.isArray(game.platforms)
        ? game.platforms.map(p => (p.platform?.name || p.name || p)).join(', ')
        : '',
      image_url: game.background_image || game.image,
    };
    
  
    try {
      
      const createdGame = await sendRequest('/games/', 'POST', newGame);  
  
      await sendRequest('/usergames/', 'POST', {
        game: createdGame.id,
        is_completed: false,
        playtime_hours: 0
      });
  
      alert('✅ Game added to My Games!');
    } catch (err) {
      console.error('Add error:', err);
      alert('❌ Failed to add game.');
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
