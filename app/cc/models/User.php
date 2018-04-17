<?php namespace cc\models;

class User
{
    private $username;
    private $password;
    private $userType;
    private $salt;
    private $userId;

    public function __construct($userAttributes)
    {
        $this->username = $userAttributes['username'];
        $this->password = $userAttributes['password'];
        $this->salt = $userAttributes['salt'];
        $this->userType = $userAttributes['userType'];

        if (isset($userAttributes['id']))
        {
            $this->userId = $userAttributes['id'];
        }
    }

    public static function addNewUser($userAttributes)
    {
        $encryptionSalt = Password::getEncryptionSaltBasedOnUserAttributes($userAttributes);
        $hashedPassword = Password::hashPassword($userAttributes['password'], $encryptionSalt);

        Database::getConnection();
        $sql = "INSERT INTO users (username, password, salt, userType, gender) VALUES (?,?,?,?,?)";
        $values = [
            $userAttributes['username'],
            $hashedPassword,
            $encryptionSalt,
            $userAttributes['userType'],
            $userAttributes['gender']
        ];

        $result = Database::getSQLQueryResult($sql, $values);

        if ($userAttributes['userType'] == 'interpreter')
        {
            Interpreter::addNewInterpreter($userAttributes);
        }
        return $result;
    }

    public static function getValidUser($username, $password)
    {

        $matchingUserAttributes = Database::getUserAttributesByUsername($username);

        $hashedPassword = Password::hashPassword($password, $matchingUserAttributes['salt']);


        if($hashedPassword === $matchingUserAttributes['password'])
        {
            return $matchingUserAttributes;
        }
        else
        {
            return false;
        }
    }

    public function signIn()
    {
        $_SESSION['id'] = $this->userId;
        $_SESSION['username'] = $this->username;
        $_SESSION['password'] = $this->password;
        $_SESSION['userType'] = $this->userType;
    }

    public function signOut()
    {
        session_destroy();
    }
}