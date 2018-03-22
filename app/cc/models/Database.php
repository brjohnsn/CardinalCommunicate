<?php

namespace cc\models;

use \PDO as PDO;

class Database
{
    protected static $_databaseConnection;
    protected $_phpDatabaseObject;

    protected function __construct()
    {
        $databaseConnectionOptions = array();
        $databaseHost = 'localhost';
        $databaseName = 'cardinal_communicate';
        $databaseUser = 'root';
        $databasePassword = 'root';
        $databaseCharSet = 'utf8mb4';
        $dataSourceName = "mysql:host=$databaseHost;dbname=$databaseName;charset=$databaseCharSet";

        $this->_phpDatabaseObject = new PDO($dataSourceName, $databaseUser, $databasePassword, $databaseConnectionOptions);
    }

    public static function getDatabaseConnection()
    {
        if (self::$_databaseConnection === null)
        {
            self::$_databaseConnection = new self;
        }
        return self::$_databaseConnection;
    }


    public function getQueryResult($sql, $args=[]){
        $sqlQuery = $this->_phpDatabaseObject->prepare($sql);
        $sqlQuery->execute($args);
        return $sqlQuery;
    }

}







