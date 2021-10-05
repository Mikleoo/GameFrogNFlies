<?php

class Connexion {

    // Connection to the database
    public function connectionBDD() {
        if (extension_loaded ('PDO')) {
            $dsn = 'mysql:host=localhost;dbname=db_frog;port=3306;charset=utf8';
            try {
                $pdo = new PDO($dsn, 'root' , '');
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $pdo;
            } catch(Exception $e) {
                die('Erreur : '.$e->getMessage());
            }
            return null;
        } else {
            echo 'PDO KO';
        }
    }

}
