// src/api/pets.js
import API from "../api";
export const getPets = () => API.get("/pets");
export const addPet = (data) => API.post("/pets", data);

// src/api/messages.js
import API from "../api";
export const getMessages = () => API.get("/messages");
export const sendMessage = (data) => API.post("/messages", data);

// src/api/reminders.js
import API from "../api";
export const getReminders = () => API.get("/reminders");
export const addReminder = (data) => API.post("/reminders", data);

// src/api/subscriptions.js
import API from "../api";
export const getSubscriptions = () => API.get("/subscriptions");
export const addSubscription = (data) => API.post("/subscriptions", data);