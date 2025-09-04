<?php include __DIR__ . "/../components/navbar.php"; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Portfolio - Projets</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding-left: 250px; }
    main { padding: 20px; }
    .projet { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; cursor: pointer; }
  </style>
  <script>
    function showProjet(titre, desc) {
      alert(titre + "\n\n" + desc);
    }
  </script>
</head>
<body>
<main>
  <h1>Projets</h1>

  <h2>Codage</h2>
  <div class="projet" onclick="showProjet('Site Web', 'Projet en HTML/CSS/JS')">Site Web</div>

  <h2>Jeux Vidéo</h2>
  <div class="projet" onclick="showProjet('Jeu Unity 2D', 'Petit jeu en C# avec Unity')">Jeu Unity 2D</div>

</main>
</body>
</html>
