import { useState } from 'react'
import { Trash2, Eye, EyeOff, Trophy, Calendar } from 'lucide-react'

function BattleHistory({ battles, onDeleteBattle }) {
  const [expandedBattle, setExpandedBattle] = useState(null)

  const handleDeleteBattle = (battleId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta batalla del historial?')) {
      onDeleteBattle(battleId)
    }
  }

  const toggleBattleDetails = (battleId) => {
    setExpandedBattle(expandedBattle === battleId ? null : battleId)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getWinnerName = (battle) => {
    if (battle.winner === battle.monster1.id) {
      return battle.monster1.name
    } else {
      return battle.monster2.name
    }
  }

  const getLoserName = (battle) => {
    if (battle.loser === battle.monster1.id) {
      return battle.monster1.name
    } else {
      return battle.monster2.name
    }
  }

  if (battles.length === 0) {
    return (
      <div className="card">
        <h2>📜 Historial de Batallas</h2>
        <div className="loading">
          <h3>No hay batallas registradas</h3>
          <p>¡Ve a la Arena de Batalla para crear tu primera épica confrontación!</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="card">
        <h2>📜 Historial de Batallas</h2>
        <p>Aquí puedes revisar todas las batallas épicas que han tenido lugar.</p>
      </div>

      {battles.map(battle => (
        <div key={battle.id} className="history-item">
          <div className="history-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={16} color="#666" />
              <span style={{ color: '#666', fontSize: '0.9rem' }}>
                {formatDate(battle.date)}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn"
                onClick={() => toggleBattleDetails(battle.id)}
                title={expandedBattle === battle.id ? 'Ocultar detalles' : 'Ver detalles'}
              >
                {expandedBattle === battle.id ? (
                  <>
                    <EyeOff size={16} />
                    Ocultar
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    Ver Detalles
                  </>
                )}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteBattle(battle.id)}
                title="Eliminar batalla"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          </div>

          <div className="battle-info">
            <div style={{ textAlign: 'center' }}>
              <h4>{battle.monster1.name}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                HP: {battle.monster1.hp} | ATK: {battle.monster1.attack} | 
                DEF: {battle.monster1.defense} | SPD: {battle.monster1.speed}
              </p>
              <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                HP Final: {battle.monster1.currentHp}
              </p>
            </div>
            
            <div className="vs-text">VS</div>
            
            <div style={{ textAlign: 'center' }}>
              <h4>{battle.monster2.name}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                HP: {battle.monster2.hp} | ATK: {battle.monster2.attack} | 
                DEF: {battle.monster2.defense} | SPD: {battle.monster2.speed}
              </p>
              <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                HP Final: {battle.monster2.currentHp}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Trophy size={20} color="#4CAF50" />
              <span className="winner-badge">
                Ganador: {getWinnerName(battle)}
              </span>
            </div>
            <p style={{ color: '#666', marginTop: '5px' }}>
              Batalla terminada en {battle.turns} turnos
            </p>
          </div>

          {expandedBattle === battle.id && battle.log && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', color: '#333' }}>📋 Registro Completo de la Batalla</h4>
              <div className="battle-log" style={{ maxHeight: '300px' }}>
                {battle.log.map((entry, index) => (
                  <div key={index} className="battle-turn">
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default BattleHistory 