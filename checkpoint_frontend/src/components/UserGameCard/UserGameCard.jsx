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

  const handlePlaytimeChange = async (e) => {
    const newHours = parseInt(e.target.value);
    if (isNaN(newHours)) return;

    try {
      await sendRequest(`/usergames/${id}/`, 'PATCH', {
        playtime_hours: newHours
      });
      refreshList();
    } catch (err) {
      console.error('Error updating playtime:', err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("❗ Are you sure you want to delete this game?")) return;

    try {
      await sendRequest(`/usergames/${id}/`, 'DELETE');
      refreshList();
    } catch (err) {
      console.error('Error deleting game:', err);
    }
  };

  return (
    <div className="user-game-card">
      <img src={game.image_url} alt={game.game_name} />
      <h3>{game.game_name}</h3>

      <p>
        Playtime:
        <input
          type="number"
          value={playtime_hours}
          onChange={handlePlaytimeChange}
        /> hours
      </p>

      <p>Status: {is_completed ? '✅ Completed' : '⏳ Not Completed'}</p>
      <button onClick={toggleStatus}>
        {is_completed ? 'Mark as Not Completed' : 'Mark as Completed'}
      </button>

      <br />

      <button
        onClick={handleDelete}
      >
        Delete Game
      </button>
    </div>
  );
}
