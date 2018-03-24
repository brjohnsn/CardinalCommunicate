<?php namespace cc\models;

use cc\models\Database as Database;
use cc\models\Password;


class User
{
    private $id;
    private $username;
    private $email;
    private $password;
    private $userType;


    public function __construct($userAttributes)
    {
        $this->username = $userAttributes['username'];
        $this->password = $userAttributes['password'];
        $this->salt = $userAttributes['salt'];
        $this->userType = $userAttributes['userType'];
    }

}