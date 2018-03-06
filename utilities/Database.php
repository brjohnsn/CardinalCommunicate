<?php

class Database
{
    protected static $connection;
    protected $pdo;

    protected function __construct()
    {
        $opt = array();
        $databaseHost = 'localhost';
        $databaseName = 'cardinal_communicate';
        $databaseUser = 'root';
        $databasePassword = 'root';
        $databaseCharSet = 'utf8mb4';

        $dsn = "mysql:host=$databaseHost;dbname=$databaseName;charset=$databaseCharSet";

        $this->pdo = new PDO($dsn, $databaseUser, $databasePassword, $opt);
    }

    public static function connect()
    {
        if (self::$connection === null)
        {
            self::$connection = new self;
        }
        return self::$connection;
    }

    public function run($sql, $args=[])
    {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($args);
        return $stmt;
    }

}







