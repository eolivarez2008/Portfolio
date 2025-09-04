<?php include __DIR__ . "/../components/navbar.php"; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Portfolio - Contact</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding-left: 250px; }
    main { padding: 20px; }
    form { display: flex; flex-direction: column; width: 300px; }
    input, textarea { margin-bottom: 10px; padding: 5px; }
  </style>
</head>
<body>
<main>
  <h1>Contact</h1>
  <form>
    <input type="text" placeholder="Nom">
    <input type="email" placeholder="Email">
    <textarea placeholder="Message"></textarea>
    <button type="submit">Envoyer</button>
  </form>
</main>
</body>
</html>
