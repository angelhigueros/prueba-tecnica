import { useState } from 'react'
import MonsterForm from './MonsterForm'
import MonsterCard from './MonsterCard'
import { Plus } from 'lucide-react'

function MonsterManager({ monsters, onAddMonster, onUpdateMonster, onDeleteMonster }) {
  const [showForm, setShowForm] = useState(false)
  const [editingMonster, setEditingMonster] = useState(null)

  const handleAddMonster = (monsterData) => {
    onAddMonster(monsterData)
    setShowForm(false)
  }

  const handleUpdateMonster = (monsterData) => {
    onUpdateMonster(monsterData)
    setEditingMonster(null)
  }

  const handleEditMonster = (monster) => {
    setEditingMonster(monster)
  }

  const handleCancelEdit = () => {
    setEditingMonster(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Gestión de monstruos</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            disabled={showForm || editingMonster}
          >
            <Plus size={20} />
            Agregar monstruo
          </button>
        </div>

        {(showForm || editingMonster) && (
          <MonsterForm
            monster={editingMonster}
            onSubmit={editingMonster ? handleUpdateMonster : handleAddMonster}
            onCancel={handleCancelEdit}
            isEditing={!!editingMonster}
          />
        )}
      </div>

      {monsters.length === 0 ? (
        <div className="card">
          <div className="loading">
            <h3>No hay monstruos registradas</h3>
            <p>Crea tu primera monstruo para comenzar las simulaciones de combate</p>
          </div>
        </div>
      ) : (
        <div className="monster-grid">
          {monsters.map(monster => (
            <MonsterCard
              key={monster.id}
              monster={monster}
              onEdit={handleEditMonster}
              onDelete={onDeleteMonster}
              showActions={!showForm && !editingMonster}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MonsterManager 