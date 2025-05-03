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
      const createdGame = await sendRequest('/games/', 'POST', newGame);
      console.log('createdGame.id:', createdGame.id)


      if (!createdGame || !createdGame.id) {
        alert('❌ Failed to retrieve game ID');
        return;
      }


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
      <img src={game.background_image || 'https://via.placeholder.com/300x200'} alt={game.name} />
      <h3>{game.name}</h3>
      {game.rating && <p>Rating: {game.rating}</p>}
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
