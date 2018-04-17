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

    public static function getConnection()
    {
        if (self::$_databaseConnection === null)
        {
            self::$_databaseConnection = new self;
        }
        return self::$_databaseConnection;
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

    public static function getClientEventDataByClientUsername($clientUsername)
    {
        $sql = "SELECT id FROM users WHERE username = ?";
        $values = [$clientUsername];
        $queryResults = Database::getSQLQueryResult($sql, $values)->fetch(PDO::FETCH_ASSOC);
        $clientId = $queryResults['id'];


        $sql = "SELECT * FROM events WHERE eventClientId = ?";
        $values = [$clientId];
        $queryResults = Database::getSQLQueryResult($sql, $values);

        $clientEventsList = self::createListOfClientEvents($queryResults);

        return $clientEventsList;
    }

    private static function createListOfClientEvents($events)
    {
        $clientEvents = [];
        foreach ($events as $event) {

            $sql = "SELECT username FROM users WHERE id = ?";
            $values = [$event['eventInterpreterId'],
            ];

            $eventInterpreter = Database::getSQLQueryResult($sql, $values)->fetch(PDO::FETCH_ASSOC);

            $interpreterUsername = $eventInterpreter['username'];

            $clientEvent = [
                'eventId' => $event['eventId'],
                'eventName' => $event['eventName'],
                'eventDate' => date("m/d/y", $event['eventStartUnixTimestamp']),
                'eventTime' => date("g:i A", $event['eventStartUnixTimestamp']),
                'eventDescription' => $event['eventDescription'],
                'eventVenueName' => $event['eventVenueName'],
                'eventAddress1' => $event['eventAddress1'],
                'eventAddress2' => $event['eventAddress2'],
                'eventCity' => $event['eventCity'],
                'eventState' => $event['eventState'],
                'eventZip' => $event['eventZip'],
                'eventClientId' => $event['eventClientId'],
                'eventInterpreterId' => $event['eventInterpreterId'],
                'eventInterpreterFirstName' => $interpreterUsername,
                'eventInterpreterLastName' => $interpreterUsername,
            ];

            array_push($clientEvents, $clientEvent);

        }

        return $clientEvents;
    }

}







