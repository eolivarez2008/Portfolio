<!-- /public/components/navbar.php -->
<style>
  .sidebar {
    position: fixed;       /* flottante, hors flux */
    top: 50%;
    left: 20px;
    padding: 5px;
    transform: translateY(-50%);
    width: 60px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    z-index: 1000;         /* toujours au-dessus du contenu */
  }

  .sidebar:hover {
    width: 200px;
  }

  .sidebar a {
    display: flex;
    align-items: center;
    padding: 15px;
    text-decoration: none;
    border-radius: 20px;
    color: #333;
    margin: 5px 0;
  }

  .sidebar a:hover {
    background: #eee;
  }

  .sidebar span.text {
    margin-left: 10px;
    display: none;
  }

  .sidebar:hover span.text {
    display: inline;
  }
</style>

<div class="sidebar">
  <a href="/portfolio/public/index.php">🧑<span class="text">Présentation</span></a>
  <a href="/portfolio/public/pages/livret.php">🎓<span class="text">Livret scolaire</span></a>
  <a href="/portfolio/public/pages/projects.php">📁<span class="text">Projets</span></a>
  <a href="/portfolio/public/pages/contact.php">✉️<span class="text">Contact</span></a>
</div>
