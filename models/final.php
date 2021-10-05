<?php
include("partie.php");

if (isset($_POST['pseudo']) && isset($_POST['score']) && isset($_POST['date'])) {
  $partie = new partie;
  $partie->setPartie($_POST['pseudo'], $_POST['score'], $_POST['date']);
  $tableau = $partie->getClassement();
  echo json_encode($tableau);
} else {
  echo "non";
}
