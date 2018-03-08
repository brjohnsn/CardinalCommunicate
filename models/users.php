<?php
require_once __DIR__."/../utilities/database.php";

class user implements \JsonSerializable{
    private $id;
    private $email;
    private $username;

    public function __construct($data){
        if(is_array($data)){
            $this->id = $data["id"];
            $this->email = $data["email"];
            $this->password = $data["password"];
            $this->username = $data["username"];
        }
    }

    public function jsonSerialize(){
        return[
            'id'=>$this->id,
            'email'=>$this->email,
            'password'=>$this->password,
            'username'=>$this->username
        ];
    }

    public function createUser($email, $password, $username){
        $db = Database::connect();
        $stmt = $db->prepare("INSERT INTO ``(`email`,`password`,`username`) VALUES(?,?)");
        $stmt->execute(array($email, $password, $username));
        $poststmt = $db->prepare("SELECT * FROM `` WHERE id = ?");
        $poststmt->execute(array($db->lastInsertId()));
        return new user($poststmt->fetch(PDO::FETCH_ASSOC));
    }

}


?>