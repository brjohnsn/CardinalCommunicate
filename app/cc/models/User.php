<?php namespace cc\models;

use cc\models\Database as Database;
use cc\models\Password;

//require "../../../utilities/Database.php";

class User {

    private $username;
    private $email;
    private $password;
    private $salt;

    public function __construct($userAttributes){
        if (isset($userAttributes['username'])){
            $this->username = $userAttributes["username"];
        }

        if (isset($userAttributes["email"])){
            $this->email = $userAttributes["email"];
        }

        if (isset($userAttributes["password"])){
            $this->password = $userAttributes["password"];
        }

        if (isset($userAttributes["salt"])) {
            $this->salt = $userAttributes["salt"];
        }
    }



    public function addToDatabase(){
        if(!isset($this->salt)){
            $this->salt = Password::generateEncryptionSalt(32);
        }
        $hashedPassword = Password::hash($this->password,$this->salt);
        $database = Database::getDatabaseConnection();
        $sql = "INSERT INTO users (username, email, password, salt) VALUES (?,?,?,?)";
        $database->getQueryResult($sql,  array($this->username, $this->email, $hashedPassword, $this->salt));
    }

    public function signIn(){
        $sql = "SELECT * FROM users WHERE username = ?";
        $database = Database::getDatabaseConnection();
        $result = $database->getQueryResult($sql, [$this->username,])->fetchObject();


        $hashedPassword = Password::hash($this->password,$result->salt);

        if($hashedPassword == $result->password){
            $_SESSION['id'] = $result->id;
            $_SESSION['loggedIn'] = true;
            $_SESSION['username'] = $this->username;
            $_SESSION['password'] = $this->password;
            return true;
        }

        else{
            session_destroy();
            return false;
        }

    }

}
?>