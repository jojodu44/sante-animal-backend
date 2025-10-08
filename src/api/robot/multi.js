import express from "express";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Fonction pour écrire le code dans le projet
function writeCodeToFile(relativePath, code) {
  const filePath = path.join(process.cwd(), "../frontend", relativePath);

  if (fs.existsSync(filePath)) {
    console.log(`⚠ Attention : ${filePath} existe déjà. Il sera écrasé.`);
  }

  fs.writeFileSync(filePath, code, "utf-8");
  console.log(`✅ Fichier écrit : ${filePath}`);
}

// Endpoint pour générer et écrire plusieurs composants
router.post("/multi", async (req, res) => {
  const { command, files } = req.body; 
  // files = [{ path: 'src/components/HealthRecords.jsx', name: 'HealthRecords' }, ...]

  try {
    const results = [];

    for (const file of files) {
      // Génération du code via OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Tu es un assistant qui génère du code React/JS clair et fonctionnel."
          },
          {
            role: "user",
            content: `${command} pour le composant ${file.name}`
          }
        ]
      });

      const generatedCode = completion.choices[0].message.content;

      // Écriture automatique
      writeCodeToFile(file.path, generatedCode);

      results.push({ file: file.path, status: "écrit avec succès" });
    }

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la génération ou écriture multiple." });
  }
});

export default router;
