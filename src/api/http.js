const SUPABASE_URL = "https://yudjaphrdielslricerd.supabase.co/rest/v1/todos";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgyMTA0OSwiZXhwIjoxOTU3Mzk3MDQ5fQ.KfaDu6gbDwocAMGZB26G3kZeorWtS18HInqtBuiQzTk";

/**
 * Permet de modifier le statut de la tâche dans l'API
 * @param {number} id 
 * @param {boolean} status 
 * @returns Promise<{id: number, done: boolean, text: string}>
 */
export const toggleTaskInApi = (id, status) => {
    return fetch(`${SUPABASE_URL}?id=eq.${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            apiKey: SUPABASE_API_KEY,
            Prefer: "return=representation",
        },
        body: JSON.stringify({ done: status }),
    });
}

/**
 * Ajoute une tâche dans l'API
 * @param {{text: string, done: boolean}} task 
 * @returns Promise<Array<{id: number, text: string, done: boolean}>>
 */
export const addTaskToApi = (task) => {
    return fetch(SUPABASE_URL, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
            apiKey: SUPABASE_API_KEY,
            Prefer: "return=representation",
        },
    }).then((response) => response.json())
}

/**
 * Récupère les donnes des tâches à partir de l'API
 * @returns Promise<Array<{id: number, text: string, done: boolean}>>
 */
export const loadTasksFromApi = () => {
    return fetch(`${SUPABASE_URL}?order=created_at`, {
        headers: {
            apiKey: SUPABASE_API_KEY,
        },
    }).then((response) => response.json())
}

export const loadTaskFromApi = (id) => {
    return fetch(`${SUPABASE_URL}?id=eq.${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            apiKey: SUPABASE_API_KEY,
            Prefer: "return=representation",
        }
    })
        .then(response => response.json())
        // La réponse contenant un tableau des tâches correspondantes
        // Nous ne retournons que la première (et la seule)
        .then(tasks => tasks[0]);
}