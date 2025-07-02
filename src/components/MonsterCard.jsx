import { Edit2, Trash2, Heart, Sword, Shield, Zap } from 'lucide-react'

function MonsterCard({ monster, onEdit, onDelete, showActions = true }) {
  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${monster.name}?`)) {
      onDelete(monster.id)
    }
  }

  const getStatColor = (statName, value) => {
    const colors = {
      hp: '#e74c3c',
      attack: '#e67e22',
      defense: '#3498db',
      speed: '#2ecc71'
    }
    return colors[statName] || '#666'
  }

  return (
    <div className="monster-card">
      <div className="monster-image-container">
        {monster.imageUrl ? (
          <img 
            src={monster.imageUrl} 
            alt={monster.name}
            className="monster-image"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div 
          className="monster-image-placeholder"
          style={{ 
            display: monster.imageUrl ? 'none' : 'flex',
            width: '100%',
            height: '200px',
            backgroundColor: '#f0f0f0',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem'
          }}
        >
          👹
        </div>
      </div>
      
      <div className="monster-info">
        <h3 className="monster-name">{monster.name}</h3>
        
        <div className="monster-stats">
          <div className="stat">
            <div className="stat-label">
              <Heart size={16} color={getStatColor('hp')} />
              Vida
            </div>
            <div className="stat-value" style={{ color: getStatColor('hp') }}>
              {monster.hp}
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-label">
              <Sword size={16} color={getStatColor('attack')} />
              Ataque
            </div>
            <div className="stat-value" style={{ color: getStatColor('attack') }}>
              {monster.attack}
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-label">
              <Shield size={16} color={getStatColor('defense')} />
              Defensa
            </div>
            <div className="stat-value" style={{ color: getStatColor('defense') }}>
              {monster.defense}
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-label">
              <Zap size={16} color={getStatColor('speed')} />
              Velocidad
            </div>
            <div className="stat-value" style={{ color: getStatColor('speed') }}>
              {monster.speed}
            </div>
          </div>
        </div>

        {showActions && (
          <div className="monster-actions">
            <button 
              className="btn btn-warning"
              onClick={() => onEdit(monster)}
              title="Editar monstruo"
            >
              <Edit2 size={16} />
              Editar
            </button>
            <button 
              className="btn btn-danger"
              onClick={handleDelete}
              title="Eliminar monstruo"
            >
              <Trash2 size={16} />
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MonsterCard 