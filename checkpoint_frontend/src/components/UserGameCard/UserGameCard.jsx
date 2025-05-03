import sendRequest from '../../utilities/sendRequest';

export default function UserGameCard({ userGame, refreshList }) {
  const { id, game, is_completed, playtime_hours } = userGame;

  const toggleStatus = async () => {
    try {
      await sendRequest(`/usergames/${id}/`, 'PATCH', {
        is_completed: !is_completed
      });
      refreshList(); // refresh the parent list
    } catch (err) {
      console.error('Error updating game status:', err);
    }
  };

  return (
    <div className="user-game-card">
      <img src={game.image_url} alt={game.game_name} />
      <h3>{game.game_name}</h3>
      <p>Playtime: {playtime_hours} hours</p>
      <p>Status: {is_completed ? '✅ Completed' : '⏳ Not Completed'}</p>
      <button onClick={toggleStatus}>
        {is_completed ? 'Mark as Not Completed' : 'Mark as Completed'}
      </button>
    </div>
  );
}
