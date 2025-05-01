import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import GameCard from '../../components/GameCard/GameCard'
import './styles.css'

const DUMMY_GAMES = [
        {
          id: 1,
          name: 'Elden Ring',
          platform: 'PC',
          image: 'https://image.api.playstation.com/vulcan/img/rnd/202111/0506/hcFeWRVGHYK72uOw6Mn6f4Ms.jpg'
        },
        {
          id: 2,
          name: 'The Witcher 3',
          platform: 'PlayStation',
          image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg?t=1736424367'
        },
        {
          id: 3,
          name: 'Red Dead Redemption 2',
          platform: 'Xbox',
          image: 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/3zDubiWo2X5WU18FGiwlsf4lKWb8MwkE.png?w=440'
        },
        {
          id: 4,
          name: 'God of War',
          platform: 'PlayStation',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ8vnp8aM1BufQGK3tCshe-Qez6dwH3pQ-Mw&s'
        },
        {
          id: 5,
          name: 'Cyberpunk 2077',
          platform: 'PC',
          image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg'
        },
        {
          id: 6,
          name: 'Minecraft',
          platform: 'Multi',
          image: 'https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png'
        },
        {
          id: 7,
          name: 'Hogwarts Legacy',
          platform: 'PC',
          image: 'https://cdn1.epicgames.com/offer/e97659b501af4e3981d5430dad170911/EGS_HogwartsLegacy_AvalancheSoftware_S1_2560x1440-aa80981dd7c9b3f26b12606974a76dba'
        },
        {
          id: 8,
          name: 'EA SPORTS FC™ 25',
          platform: 'Multi',
          image: 'https://image.api.playstation.com/vulcan/ap/rnd/202503/2520/f3c135f8ebdc50b782c6f5f02b27130b499e22847f05aee6.png'
        },
        {
          id: 9,
          name: 'Fortnite',
          platform: 'PC',
          image: 'https://m.media-amazon.com/images/M/MV5BMTZlMmIxM2EtN2Y4Zi00M2ZhLTk3NzgtNjJmZTU0MTQ3YjcwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
        },
        {
          id: 10,
          name: 'GTA V',
          platform: 'Multi',
          image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png'
        }
      ]
      
      

export default function HomePage() {
  const [games, setGames] = useState(DUMMY_GAMES)

  return (
    <>
      <Navbar />
      <SearchBar onSearch={(q) => console.log(q)} />
      <div className="game-list">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </>
  )
}
