<?php namespace cc\models;

class User
{
    private $username;
    private $password;
    private $userType;
    private $salt;


    public function __construct($userAttributes)
    {
        $this->username = $userAttributes['username'];
        $this->password = $userAttributes['password'];
        $this->salt = $userAttributes['salt'];
        $this->userType = $userAttributes['userType'];
    }

}