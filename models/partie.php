<?php
include("connexion_bdd.php");

class partie {

  function getClassement() {
    $connexion = new Connexion;
    $db = $connexion->connectionBDD();
    $getPartie = $db->prepare("SELECT * FROM partie ORDER BY score ASC LIMIT 10");
    $getPartie->execute();
    $partie = $getPartie->fetchAll();
    $getPartie->closeCursor();
    return $partie;
  }

  function getPartie() {
    $connexion = new Connexion;
    $db = $connexion->connectionBDD();
    $getPartie = $db->prepare("SELECT * FROM partie");
    $getPartie->execute();
    $partie = $getPartie->fetchAll();
    $getPartie->closeCursor();
    return $partie;
  }

  function setPartie($pseudo, $score, $date) {
      $connexion = new Connexion;
      $db = $connexion->connectionBDD();
      $setPartie = $db->prepare("INSERT INTO `partie` (pseudo, score, date) VALUES (:pseudo, :score, :date)");
      $setPartie->execute(array(':pseudo' => $pseudo, ':score' => $score, ':date' => $date));
      $setPartie->fetch();
      $setPartie->closeCursor();
      return true;
  }
  
}
