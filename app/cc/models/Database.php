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


    public static function getSQLQueryResult($sql, $args=[])
    {
        Database::getConnection();
        $sqlQuery = self::$_phpDatabaseObject->prepare($sql);
        $sqlQuery->execute($args);

        return $sqlQuery;
    }





}







