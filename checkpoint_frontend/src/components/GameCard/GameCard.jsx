import './styles.css'

export default function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.name} />
      <h3>{game.name}</h3>
      <p>{game.platform}</p>
    </div>
  )
}
