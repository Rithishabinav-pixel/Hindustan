'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './TagInput.module.css'

export default function TagInput({ value = [], onChange, disabled }) {
  const [inputVal,     setInputVal]     = useState('')
  const [suggestions,  setSuggestions]  = useState([])
  const [allTags,      setAllTags]      = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    fetch('/api/admin/tags')
      .then((r) => r.json())
      .then((data) => setAllTags(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!inputVal.trim()) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }
    const q = inputVal.toLowerCase()
    const filtered = allTags.filter(
      (t) => t.toLowerCase().includes(q) && !value.includes(t)
    )
    setSuggestions(filtered)
    setShowDropdown(filtered.length > 0)
  }, [inputVal, allTags, value])

  function addTag(tag) {
    const trimmed = tag.trim()
    if (!trimmed || value.includes(trimmed)) return
    onChange([...value, trimmed])
    setInputVal('')
    setShowDropdown(false)
    inputRef.current?.focus()
  }

  function removeTag(tag) {
    onChange(value.filter((t) => t !== tag))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputVal)
    } else if (e.key === 'Backspace' && !inputVal && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div className={`${styles.wrap} ${disabled ? styles.disabled : ''}`}>
      <div className={styles.tagList}>
        {value.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
            {!disabled && (
              <button type="button" className={styles.removeTag} onClick={() => removeTag(tag)}>
                ×
              </button>
            )}
          </span>
        ))}
        {!disabled && (
          <input
            ref={inputRef}
            type="text"
            className={styles.tagInput}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder={value.length === 0 ? 'Type a tag and press Enter…' : ''}
            disabled={disabled}
          />
        )}
      </div>

      {showDropdown && (
        <ul className={styles.dropdown}>
          {suggestions.map((s) => (
            <li key={s} className={styles.suggestion} onMouseDown={() => addTag(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
