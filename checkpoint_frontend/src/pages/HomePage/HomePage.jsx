import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import { getAllGames, deleteGame } from '../../utilities/games-api'

export default function HomePage() {
  const [games, setGames] = useState([])

  useEffect(() => {
    async function loadGames() {
      const data = await getAllGames()
      setGames(data)
    }
    loadGames()
  }, [])

  async function handleDelete(id) {
    const ok = await deleteGame(id)
    if (ok !== false) {
      setGames(games.filter(game => game.id !== id))
    }
  }

  return (
    <>
      <Navbar />
      <div className="game-list">
        {games.map((game) => (
          <div key={game.id}>
            <GameCard game={game} />
            <button onClick={() => handleDelete(game.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  )
}
