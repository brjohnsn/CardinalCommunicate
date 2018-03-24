<?php

namespace cc\models;

use \PDO as PDO;

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
        if(!isset($userAttributes['salt']))
        {
            $encryptionSalt = Password::generateEncryptionSalt();
        }
        else
        {
            $encryptionSalt = $userAttributes['salt'];
        }

        $hashedPassword = Password::hashPassword($userAttributes['password'], $encryptionSalt);

        self::getConnection();
        $sql = "INSERT INTO users (username, password, salt, userType) VALUES (?,?,?,?)";
        $values = [
            $userAttributes['username'],
            $hashedPassword,
            $encryptionSalt,
            $userAttributes['userType'],
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







