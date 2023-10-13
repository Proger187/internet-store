import { useState } from "react"
import React from 'react'

export const Searcher = ({onSearch}) => {
    const [Value, setValue] = useState("")
    return (
    <div className="searcher">
        <input placeholder="Поиск..." type="text" value={Value} onChange={e => setValue(e.target.value)}/>
        <button className="primary-btn" onClick={() => onSearch(Value)}>Найти</button>
    </div>
    )
}
