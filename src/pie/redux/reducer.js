// reducer.js
const initialisation = {
  categories: [
    { id: 1, nom: "Technologie", icon: "bi bi-display" },
    { id: 2, nom: "Design", icon: "bi bi-pencil" },
    { id: 3, nom: "Marketing", icon: "bi bi-megaphone-fill" },
    { id: 4, nom: "Comptabilite", icon: "bi bi-calculator" },
    { id: 5, nom: "Ingenierie", icon: "bi bi-graph-up-arrow" },
    { id: 6, nom: "Administration & gestion", icon: "bi bi-briefcase-fill" },
    { id: 7, nom: "Ressources humaines", icon: "bi bi-people-fill" },
    { id: 8, nom: "Autre", icon: "bi bi-bar-chart-line-fill" },
  ],
  count: 0,
  notifications: [],
  candidateNotifications: {}, // New state for candidate-specific notifications
};

export default function reducer(state = initialisation, action) {
  switch (action.type) {
    // case 'ADD_NOTIFICATION':
    //   const { notification, candidateId } = action.payload;
    //   const newCount = (state.candidateNotifications[candidateId] || 0) + 1;
    //   return {
    //     ...state,
    //     notifications: [...state.notifications, notification],
    //     candidateNotifications: {
    //       ...state.candidateNotifications,
    //       [candidateId]: newCount,
    //     },
    //   };
    default:
      return state;
  }
}
