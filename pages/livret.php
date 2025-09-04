<?php include __DIR__ . "/../components/navbar.php"; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Portfolio - Livret scolaire</title>
  <link rel="stylesheet" type="text/css" href="../styles/livret.css" media="all">
  <link rel="stylesheet" type="text/css" href="../styles/main.css" media="all">
</head>
<body>
<main>
  <section class="container">
      <section>
          <section class="TitrePresentation" id="Certifications">
              <h1 class="TitrePresentation">Certifications</h1>
          </section>
          <section class="TitrePresentation">
              <hr>
          </section>
      </section>
      <section class="Certifications">
          <div class="certification">
              <div class="certification_image">
                  <img src="../assets/logos/pix.png" alt="Logo Pix" width="100">
              </div>
              <div class="certification_description">
                  <p class="certification_titre">PIX</p>
                  <p>Pix est le service public en ligne pour évaluer ses compétences numériques.(Pendant le Collège et le Lycée)</p>
                  <a href="../assets/documents/Certification-PIX.pdf" target="_blank" rel="noreferrer">
                      <button class="certification_bouton">
                          <ion-icon class="icon" name="document-attach-outline"></ion-icon>
                          &nbsp;Voir l'attestation
                      </button>
                  </a>
              </div>
          </div>
      </section>
  </section>

    <section class="container">
      <section>
          <section class="TitrePresentation" id="Certifications">
              <h1 class="TitrePresentation">Diplômes</h1>
          </section>
          <section class="TitrePresentation">
              <hr>
          </section>
      </section>
      <section class="Certifications">
          <div class="certification">
              <div class="certification_image">
                  <img src="../assets/logos/brevet-des-colleges.png" alt="Logo Pix" width="100">
              </div>
              <div class="certification_description">
                  <p class="certification_titre">Brevet</p>
                  <p>Le Diplôme National du Brevet est le premier diplôme officiel validant les connaissances et compétences acquises au collège.</p>
                  <a href="../assets/documents/Diplôme-National-Brevet.pdf" target="_blank" rel="noreferrer">
                      <button class="certification_bouton">
                          <ion-icon class="icon" name="document-attach-outline"></ion-icon>
                          &nbsp;Voir l'attestation
                      </button>
                  </a>
              </div>
          </div>
      </section>
    </section>

</main>
</body>
</html>
