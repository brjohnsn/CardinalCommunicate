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

    public static function getValidUser($username, $password)
    {
        $matchingUserAttributes = Database::getUserAttributesByUsername($username);

        $hashedPassword = Password::hashPassword($password, $matchingUserAttributes['salt']);

        if($hashedPassword === $matchingUserAttributes['password'])
        {
            return new self($matchingUserAttributes);
        }
        else
        {
            return false;
        }
    }
}