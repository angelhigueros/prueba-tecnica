import { useState } from 'react'
import { Swords, Play, RotateCcw } from 'lucide-react'

function BattleArena({ monsters, onBattleComplete }) {
  const [selectedMonster1, setSelectedMonster1] = useState('')
  const [selectedMonster2, setSelectedMonster2] = useState('')
  const [battleLog, setBattleLog] = useState([])
  const [battleResult, setBattleResult] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const simulateBattle = async () => {
    if (!selectedMonster1 || !selectedMonster2) {
      alert('Por favor seleccione dos criaturas para el combate')
      return
    }

    if (selectedMonster1 === selectedMonster2) {
      alert('Una criatura no puede combatir contra sí misma')
      return
    }

    setIsSimulating(true)
    setBattleLog([])
    setBattleResult(null)

    const fighter1 = { 
      ...monsters.find(m => m.id.toString() === selectedMonster1),
      currentHp: monsters.find(m => m.id.toString() === selectedMonster1).hp
    }
    const fighter2 = { 
      ...monsters.find(m => m.id.toString() === selectedMonster2),
      currentHp: monsters.find(m => m.id.toString() === selectedMonster2).hp
    }

    const log = []
    log.push(`Iniciando combate entre ${fighter1.name} y ${fighter2.name}`)
    log.push(`${fighter1.name}: ${fighter1.currentHp} HP | ${fighter2.name}: ${fighter2.currentHp} HP`)
    
    let firstAttacker, secondAttacker
    if (fighter1.speed > fighter2.speed) {
      firstAttacker = fighter1
      secondAttacker = fighter2
    } else if (fighter2.speed > fighter1.speed) {
      firstAttacker = fighter2
      secondAttacker = fighter1
    } else {
      if (fighter1.attack >= fighter2.attack) {
        firstAttacker = fighter1
        secondAttacker = fighter2
      } else {
        firstAttacker = fighter2
        secondAttacker = fighter1
      }
    }

    log.push(`${firstAttacker.name} tiene mayor velocidad y atacará primero`)
    setBattleLog([...log])
    await delay(1500)

    let turn = 1
    while (fighter1.currentHp > 0 && fighter2.currentHp > 0) {
      log.push(`\n--- Turno ${turn} ---`)
      
      if (firstAttacker.currentHp > 0) {
        const damage = calculateDamage(firstAttacker, secondAttacker)
        secondAttacker.currentHp = Math.max(0, secondAttacker.currentHp - damage)
        
        log.push(`${firstAttacker.name} ataca a ${secondAttacker.name} causando ${damage} de daño`)
        log.push(`${secondAttacker.name} tiene ahora ${secondAttacker.currentHp} HP`)
        setBattleLog([...log])
        await delay(1000)
        
                  if (secondAttacker.currentHp <= 0) {
            log.push(`${secondAttacker.name} ha sido derrotado`)
            break
          }
      }

      if (secondAttacker.currentHp > 0) {
        const damage = calculateDamage(secondAttacker, firstAttacker)
        firstAttacker.currentHp = Math.max(0, firstAttacker.currentHp - damage)
        
        log.push(`${secondAttacker.name} ataca a ${firstAttacker.name} causando ${damage} de daño`)
        log.push(`${firstAttacker.name} tiene ahora ${firstAttacker.currentHp} HP`)
        setBattleLog([...log])
        await delay(1000)
        
        if (firstAttacker.currentHp <= 0) {
          log.push(`${firstAttacker.name} ha sido derrotado`)
          break
        }
      }

      turn++
    }

    const winner = fighter1.currentHp > 0 ? fighter1 : fighter2
    const loser = fighter1.currentHp <= 0 ? fighter1 : fighter2

    log.push(`${winner.name} es el ganador del combate`)
    setBattleLog([...log])
    setBattleResult({ winner, loser, turns: turn })

    const battleData = {
      monster1: { ...fighter1, currentHp: fighter1.currentHp },
      monster2: { ...fighter2, currentHp: fighter2.currentHp },
      winner: winner.id,
      loser: loser.id,
      turns: turn,
      log: [...log]
    }

    onBattleComplete(battleData)
    setIsSimulating(false)
  }

  const calculateDamage = (attacker, defender) => { 
    const damage = Math.max(1, attacker.attack - defender.defense)
    return damage
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const resetBattle = () => {
    setSelectedMonster1('')
    setSelectedMonster2('')
    setBattleLog([])
    setBattleResult(null)
  }

  if (monsters.length < 2) {
    return (
      <div className="battle-arena">
        <h2>Arena de Combate</h2>
        <div className="loading">
          <h3>Se necesitan al menos 2 criaturas para iniciar un combate</h3>
          <p>Registre más criaturas en la sección "Gestión de Criaturas"</p>
        </div>
      </div>
    )
  }

      return (
      <div className="battle-arena">
        <h2>Arena de Combate</h2>
        
        <div className="monster-selector">
          <div className="selector-section">
            <h3>Primera Criatura</h3>
            <select 
              className="monster-select"
              value={selectedMonster1}
              onChange={(e) => setSelectedMonster1(e.target.value)}
              disabled={isSimulating}
            >
              <option value="">Seleccione una criatura...</option>
            {monsters.map(monster => (
              <option key={monster.id} value={monster.id}>
                {monster.name} (HP: {monster.hp}, ATK: {monster.attack}, DEF: {monster.defense}, SPD: {monster.speed})
              </option>
            ))}
          </select>
        </div>

                  <div className="selector-section">
            <h3>Segunda Criatura</h3>
            <select 
              className="monster-select"
              value={selectedMonster2}
              onChange={(e) => setSelectedMonster2(e.target.value)}
              disabled={isSimulating}
            >
              <option value="">Seleccione una criatura...</option>
            {monsters.map(monster => (
              <option key={monster.id} value={monster.id}>
                {monster.name} (HP: {monster.hp}, ATK: {monster.attack}, DEF: {monster.defense}, SPD: {monster.speed})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          className="btn btn-primary battle-button"
          onClick={simulateBattle}
          disabled={!selectedMonster1 || !selectedMonster2 || isSimulating}
          style={{ flex: 1 }}
        >
          {isSimulating ? (
            <>
              <Swords size={20} />
              Combate en progreso...
            </>
          ) : (
            <>
              <Play size={20} />
              Iniciar Combate
            </>
          )}
        </button>
        
        <button 
          className="btn"
          onClick={resetBattle}
          disabled={isSimulating}
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {battleLog.length > 0 && (
        <div className="battle-log">
          <h3>Registro de Combate</h3>
          {battleLog.map((entry, index) => (
            <div key={index} className="battle-turn">
              {entry}
            </div>
          ))}
        </div>
      )}

      {battleResult && (
        <div className="battle-result">
          {battleResult.winner.name} ha ganado el combate en {battleResult.turns} turnos
        </div>
      )}
    </div>
  )
}

export default BattleArena 