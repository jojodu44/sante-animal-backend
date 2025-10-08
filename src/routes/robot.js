// backend/src/routes/robot.js
import express from "express";
import fs from "fs";
import path from "path";
import { verifyToken } from "../src/middlewares/verifyToken.js";

const router = express.Router();

// Modules à générer
const modules = [
  "HealthRecords",
  "Documents",
  "Appointments",
  "Reminders",
  "Subscriptions",
];

router.post("/generate-crud", verifyToken, async (req, res) => {
  try {
    const frontendDir = path.join(process.cwd(), "frontend/src/components");

    modules.forEach((moduleName) => {
      const componentDir = path.join(frontendDir, moduleName);
      if (!fs.existsSync(componentDir)) fs.mkdirSync(componentDir);

      const componentCode = `
import React, { useState, useEffect } from "react";
import api from "../../api/axios";

export default function ${moduleName}() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try { const res = await api.get("/${moduleName.toLowerCase()}"); setItems(res.data); }
    catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(\`/${moduleName.toLowerCase()}/\${editingId}\`, form);
        setItems(items.map(i => i._id === editingId ? { ...i, ...form } : i));
        setEditingId(null);
      } else {
        const res = await api.post("/${moduleName.toLowerCase()}", form);
        setItems([...items, res.data]);
      }
      setForm({});
    } catch (err) { console.error(err); }
  };

  const handleEdit = (item) => { setForm(item); setEditingId(item._id); };
  const handleDelete = async (id) => {
    try { await api.delete(\`/${moduleName.toLowerCase()}/\${id}\`); setItems(items.filter(i => i._id !== id)); }
    catch (err) { console.error(err); }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">${moduleName}</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input type="text" placeholder="Titre" className="border p-2 rounded flex-1" value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input type="date" className="border p-2 rounded" value={form.date || ""} onChange={e => setForm({ ...form, date: e.target.value })} />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{editingId ? "Modifier" : "Ajouter"}</button>
      </form>
      <ul>
        {items.map(i => (
          <li key={i._id} className="flex justify-between border-b py-2">
            <div><span className="font-bold">{i.title}</span> - <span>{i.date}</span></div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(i)} className="px-2 py-1 bg-yellow-400 text-white rounded">Éditer</button>
              <button onClick={() => handleDelete(i._id)} className="px-2 py-1 bg-red-500 text-white rounded">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
      `;

      fs.writeFileSync(path.join(componentDir, "index.jsx"), componentCode.trim());
    });

    res.json({ message: "✅ Tous les composants CRUD ont été générés !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Erreur lors de la génération" });
  }
});

export default router;