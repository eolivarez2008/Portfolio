<?php include "components/navbar.php"; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Portfolio - Présentation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #f0f4ff, #e8ecf7);
      color: #333;
    }

    main {
      max-width: 1000px;
      margin: 80px auto;
      padding: 40px;
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      text-align: center;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      color: #2c3e50;
    }

    h2 {
      font-size: 1.5em;
      margin-bottom: 30px;
      color: #555;
    }

    .hero {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }

    .hero img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 50%;
      border: 4px solid #2c3e50;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .intro {
      max-width: 500px;
      text-align: left;
    }

    .intro p {
      margin-bottom: 15px;
      line-height: 1.6;
    }

    .highlights {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }

    .card {
      background: #f9f9f9;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 3px 10px rgba(0,0,0,0.05);
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }

    .card h3 {
      margin-bottom: 10px;
      color: #2c3e50;
    }

    .cta {
      margin-top: 40px;
    }

    .cta a {
      display: inline-block;
      padding: 12px 25px;
      background: #2c3e50;
      color: #fff;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      transition: background 0.3s;
    }

    .cta a:hover {
      background: #1a242f;
    }
  </style>
</head>
<body>

<main>
  <!-- Hero section -->
  <div class="hero">
    <img src="./assets/images/photo-profil.png" alt="Photo de profil">
    <div class="intro">
      <h1>Salut, moi c’est <span style="color:#2c3e50;">Emilien OLIVAREZ</span> 👋</h1>
      <h2>Étudiant passionné par le numérique</h2>
      <p>Je suis un étudiant motivé, toujours curieux d’apprendre de nouvelles choses et de créer des projets uniques.</p>
      <p>Mon portfolio est là pour te montrer mes bulletins, mes projets de codage, mes jeux vidéo, et bien plus encore.</p>
    </div>
  </div>

  <!-- Points forts -->
  <section class="highlights">
    <div class="card">
      <h3>📚 Parcours scolaire</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
         Clique pour découvrir mes résultats et diplômes.</p>
    </div>
    <div class="card">
      <h3>💻 Projets de codage</h3>
      <p>Du HTML/CSS au JavaScript, en passant par le PHP, 
         je réalise des projets variés pour apprendre et progresser.</p>
    </div>
    <div class="card">
      <h3>🎮 Jeux vidéo</h3>
      <p>Passionné de gaming et de développement de jeux, 
         j’ai aussi créé mes propres expériences interactives.</p>
    </div>
  </section>

</main>

</body>
</html>
