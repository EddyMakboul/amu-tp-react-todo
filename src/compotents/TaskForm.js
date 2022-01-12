import React, { useState } from "react";

const TaskForm = (props) => {

    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        // Annulons le comportement par défaut de l'événement
        // qui serait de recharger la page
        event.preventDefault();

       // Appelons la fonction onTaskAdded passée en props
       props.onTaskAdded(text);
    }

    const updateText = (event) => {
        // On fait évoluer le state "text" en remplaçant la valeur
        // acutelle par la valeur mise à jour de l'<input>
        setText(event.target.value);
    }

    return <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="todo-text"
            placeholder="Ajouter une tâche"
            onChange={updateText}
            value={text}
        />
        <button>Ajouter</button>
    </form>
}

export default TaskForm