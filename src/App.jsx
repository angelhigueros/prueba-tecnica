import { useState } from 'react'
import MonsterManager from './components/MonsterManager'
import BattleArena from './components/BattleArena'
import BattleHistory from './components/BattleHistory'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [activeTab, setActiveTab] = useState('monsters')
  const [monsters, setMonsters] = useLocalStorage('monsters', [])
  const [battles, setBattles] = useLocalStorage('battles', [])

  const addMonster = (monster) => {
    const newMonster = {
      ...monster,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    setMonsters([...monsters, newMonster])
  }

  const updateMonster = (updatedMonster) => {
    setMonsters(monsters.map(monster => 
      monster.id === updatedMonster.id ? updatedMonster : monster
    ))
  }

  const deleteMonster = (monsterId) => {
    setMonsters(monsters.filter(monster => monster.id !== monsterId))
  }

  const addBattle = (battle) => {
    const newBattle = {
      ...battle,
      id: Date.now(),
      date: new Date().toISOString()
    }
    setBattles([...battles, newBattle])
  }

  const deleteBattle = (battleId) => {
    setBattles(battles.filter(battle => battle.id !== battleId))
  }

  const tabs = [
    { id: 'monsters', label: 'Gestión de Criaturas' },
    { id: 'battle', label: 'Arena de Combate' },
    { id: 'history', label: 'Historial de Combates' }
  ]

  return (
    <div className="container">
      <div className="header">
        <h1>Sistema de Batalla de Monstruos</h1>
        <p>Gestiona criaturas y simula combates estratégicos</p>
      </div>

      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'monsters' && (
        <MonsterManager
          monsters={monsters}
          onAddMonster={addMonster}
          onUpdateMonster={updateMonster}
          onDeleteMonster={deleteMonster}
        />
      )}

      {activeTab === 'battle' && (
        <BattleArena
          monsters={monsters}
          onBattleComplete={addBattle}
        />
      )}

      {activeTab === 'history' && (
        <BattleHistory
          battles={battles}
          onDeleteBattle={deleteBattle}
        />
      )}
    </div>
  )
}

export default App 