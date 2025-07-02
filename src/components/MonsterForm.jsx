import { useState, useEffect } from 'react'
import { Save, X } from 'lucide-react'

function MonsterForm({ monster, onSubmit, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    imageUrl: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (monster) {
      setFormData({
        name: monster.name || '',
        hp: monster.hp || '',
        attack: monster.attack || '',
        defense: monster.defense || '',
        speed: monster.speed || '',
        imageUrl: monster.imageUrl || ''
      })
    }
  }, [monster])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    if (!formData.hp || formData.hp < 1 || formData.hp > 1000) {
      newErrors.hp = 'La vida debe estar entre 1 y 1000'
    }
    
    if (!formData.attack || formData.attack < 1 || formData.attack > 200) {
      newErrors.attack = 'El ataque debe estar entre 1 y 200'
    }
    
    if (!formData.defense || formData.defense < 1 || formData.defense > 200) {
      newErrors.defense = 'La defensa debe estar entre 1 y 200'
    }
    
    if (!formData.speed || formData.speed < 1 || formData.speed > 200) {
      newErrors.speed = 'La velocidad debe estar entre 1 y 200'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const monsterData = {
      ...formData,
      hp: parseInt(formData.hp),
      attack: parseInt(formData.attack),
      defense: parseInt(formData.defense),
      speed: parseInt(formData.speed),
      maxHp: parseInt(formData.hp) 
    }

    if (isEditing) {
      monsterData.id = monster.id
      monsterData.createdAt = monster.createdAt
    }

    onSubmit(monsterData)
    
    if (!isEditing) {
      setFormData({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        imageUrl: ''
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{isEditing ? 'Editar Monstruo' : 'Agregar Nuevo Monstruo'}</h3>
      
      <div className="form-group">
        <label htmlFor="name">Nombre del Monstruo *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Dragón Feroz"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="form-group">
          <label htmlFor="hp">Vida (HP) *</label>
          <input
            type="number"
            id="hp"
            name="hp"
            value={formData.hp}
            onChange={handleChange}
            min="1"
            max="1000"
            placeholder="100"
            className={errors.hp ? 'error' : ''}
          />
          {errors.hp && <span className="error-text">{errors.hp}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="attack">Ataque *</label>
          <input
            type="number"
            id="attack"
            name="attack"
            value={formData.attack}
            onChange={handleChange}
            min="1"
            max="200"
            placeholder="50"
            className={errors.attack ? 'error' : ''}
          />
          {errors.attack && <span className="error-text">{errors.attack}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="defense">Defensa *</label>
          <input
            type="number"
            id="defense"
            name="defense"
            value={formData.defense}
            onChange={handleChange}
            min="1"
            max="200"
            placeholder="30"
            className={errors.defense ? 'error' : ''}
          />
          {errors.defense && <span className="error-text">{errors.defense}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="speed">Velocidad *</label>
          <input
            type="number"
            id="speed"
            name="speed"
            value={formData.speed}
            onChange={handleChange}
            min="1"
            max="200"
            placeholder="40"
            className={errors.speed ? 'error' : ''}
          />
          {errors.speed && <span className="error-text">{errors.speed}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">URL de Imagen (opcional)</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen-monstruo.jpg"
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
        <button type="button" className="btn" onClick={onCancel}>
          <X size={20} />
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={20} />
          {isEditing ? 'Actualizar' : 'Guardar'} Monstruo
        </button>
      </div>
    </form>
  )
}

export default MonsterForm 