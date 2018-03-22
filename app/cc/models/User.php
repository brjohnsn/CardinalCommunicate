<?php namespace cc\models;

use cc\models\Database as Database;
use cc\models\Password;


class User
{
    private $id;
    private $username;
    private $email;
    private $password;
    private $type;


    public function __construct($userAttributes)
    {
        $this->username = $userAttributes['username'];
        $this->password = $userAttributes['password'];
        $this->email = $userAttributes['email'];
        $this->type = $userAttributes['type'];
        $this->salt = $userAttributes['salt'];

    }

    public function addToDatabase(){
        $sql = 'INSERT INTO users (username, password, email, type, salt) VALUES (?,?,?,?,?)';
        $result = Database::getDatabaseConnection()->getQueryResult($sql, [$this->username, $this->password, $this->email, $this->type, $this->salt]);
    }

}