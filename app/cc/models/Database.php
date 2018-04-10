<?php

namespace cc\models;

use \PDO as PDO;

error_reporting(E_ALL);
ini_set("display_errors",1);

class Database
{
    private static $_databaseConnection;
    private static $_phpDatabaseObject;

    private function __construct()
    {
        $databaseConnectionOptions = array();
        $databaseHost = 'localhost';
        $databaseName = 'cardinal_communicate';
        $databaseUser = 'root';
        $databasePassword = 'root';
        $databaseCharSet = 'utf8mb4';
        $dataSourceName = "mysql:host=$databaseHost;dbname=$databaseName;charset=$databaseCharSet";

        self::$_phpDatabaseObject = new PDO($dataSourceName, $databaseUser, $databasePassword, $databaseConnectionOptions);
    }

    private static function getConnection()
    {
        if (self::$_databaseConnection === null)
        {
            self::$_databaseConnection = new self;
        }
        return self::$_databaseConnection;
    }

    public static function addNewUser($userAttributes)
    {
        $encryptionSalt = Password::getEncryptionSaltBasedOnUserAttributes($userAttributes);
        $hashedPassword = Password::hashPassword($userAttributes['password'], $encryptionSalt);

        self::getConnection();
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
            self::addNewInterpreter($userAttributes);
        }
        return $result;
    }


    public static function addNewInterpreter($interpreterAttributes)
    {
        $userAttributes = self::getUserAttributesByUsername($interpreterAttributes['username']);

        $sql = "INSERT INTO interpreters (userId, telephone, zip, certification) VALUES (?,?,?,?)";
        $values = [$userAttributes['id'],
            $interpreterAttributes['telephone'],
            $interpreterAttributes['zip'],
            $interpreterAttributes['certification']

    public static function addNewEvent($eventAttributes)
    {
        self::getConnection();
        $sql = "INSERT INTO events (eventName, 
                                    eventZipCode, 
                                    eventStartUnixTimestamp, 
                                    eventEndUnixTimestamp, 
                                    eventClientId,
                                    eventInterpreterId
                                    ) 
                                    VALUES (?,?,?,?,?,?)";
        $values = [
            $eventAttributes['eventName'],
            $eventAttributes['eventZipCode'],
            $eventAttributes['eventStartUnixTimestamp'],
            $eventAttributes['eventEndUnixTimestamp'],
            $eventAttributes['eventClientId'],
            $eventAttributes['eventInterpreterId'],

        ];

        $result = Database::getSQLQueryResult($sql, $values);
        return $result;
    }

    public static function getUserAttributesByUsername($username)
    {
        $userAttributes = self::getUniversalUserAttributesByUsername($username);
        if ($userAttributes['userType'] == 'interpreter')
        {
            $interpreterAttributes = self::getInterpreterAttributesByUserId($userAttributes['id']);
            $userAttributes = array_merge($userAttributes, $interpreterAttributes);
        }
        return $userAttributes;
    }

    public static function getUniversalUserAttributesByUsername($username)
    {$sql = "SELECT * FROM users WHERE username = ?";
        $arguments = [$username];
        $userAttributes = Database::getSQLQueryResult($sql, $arguments)->fetch(PDO::FETCH_ASSOC);

        return $userAttributes;

    }

    public static function getInterpreterAttributesByUserId($userId){
        $sql = "SELECT * FROM interpreters WHERE userId = ?";
        $arguments = [$userId];
        $interpreterAttributes = Database::getSQLQueryResult($sql, $arguments)->fetch(PDO::FETCH_ASSOC);

        if (empty($interpreterAttributes))
        {
            $interpreterAttributes=[];
        }
        return $interpreterAttributes;

    }

    public static function addNewEvent($eventAttributes)
    {
        self::getConnection();
        $sql = "INSERT INTO events (eventName, 
                                    eventZipCode, 
                                    eventStartUnixTimestamp, 
                                    eventEndUnixTimestamp, 
                                    eventClientId,
                                    eventInterpreterId
                                    ) 
                                    VALUES (?,?,?,?,?,?)";
        $values = [
            $eventAttributes['eventName'],
            $eventAttributes['eventZipCode'],
            $eventAttributes['eventStartUnixTimestamp'],
            $eventAttributes['eventEndUnixTimestamp'],
            $eventAttributes['eventClientId'],
            $eventAttributes['eventInterpreterId'],
        ];
        $result = Database::getSQLQueryResult($sql, $values);
        return $result;
    }

    public static function getSQLQueryResult($sql, $args=[])
    {
        Database::getConnection();
        $sqlQuery = self::$_phpDatabaseObject->prepare($sql);
        $sqlQuery->execute($args);
        return $sqlQuery;
    }

}







