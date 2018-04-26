<?php namespace cc\models;

use PDO;
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

        $sql = "INSERT INTO users (username, password, salt, firstName, lastName, address1, address2, city, state, zip, userType, gender) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        $values = [
            $userAttributes['username'],
            $hashedPassword,
            $encryptionSalt,
            $userAttributes['firstName'],
            $userAttributes['lastName'],
            $userAttributes['address1'],
            $userAttributes['address2'],
            $userAttributes['city'],
            $userAttributes['state'],
            $userAttributes['zip'],
            $userAttributes['userType'],
            $userAttributes['gender'],
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
        $matchingUserAttributes = User::getUserAttributesByUsername($username);
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

    public static function getUniversalUserAttributesByUsername($username)
    {$sql = "SELECT * FROM users WHERE username = ?";
        $arguments = [$username];
        $userAttributes = Database::getSQLQueryResult($sql, $arguments)->fetch(PDO::FETCH_ASSOC);

        $userAddress = self::createAddressStringFromAddressAttributes($userAttributes);
        $userAttributes['address'] = $userAddress;
        return $userAttributes;
    }

    public static function getUserAttributesByUsername($username)
    {
        $userAttributes = User::getUniversalUserAttributesByUsername($username);
        $usertype = $userAttributes['userType'];
        if ($usertype == 'interpreter')
        {
            $interpreterAttributes = Interpreter::getInterpreterAttributesByUserId($userAttributes['id']);
            $userAttributes = array_merge($userAttributes, $interpreterAttributes);
        }

        return $userAttributes;
    }

    public static function createAddressStringFromAddressAttributes($addressAttributes)
    {
        $addressString = $addressAttributes['address1'] . ',' . $addressAttributes['city'] . ',' . $addressAttributes['state'] . ',' . $addressAttributes['zip'];
        return $addressString;

    }
}