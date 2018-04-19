<?php
/**
 * Created by PhpStorm.
 * User: Chris
 * Date: 4/16/2018
 * Time: 8:59 PM
 */

namespace cc\models;
use PDO;


class Client
{
    public static function getClientEventDataByClientUsername($clientUsername)
    {
        $clientId = self::getUserIdByUsername($clientUsername);


        $sql = "SELECT * FROM events WHERE eventClientId = ?";
        $values = [$clientId];
        $queryResults = Database::getSQLQueryResult($sql, $values);

        $clientEventsList = self::createListOfClientEvents($queryResults);


        return $clientEventsList;
    }

    public static function getUserIdByUsername($clientUsername)
    {
        $sql = "SELECT id FROM users WHERE username = ?";
        $values = [$clientUsername];
        $queryResults = Database::getSQLQueryResult($sql, $values)->fetch(PDO::FETCH_ASSOC);
        $clientId = $queryResults['id'];
        return $clientId;
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

    public static function findInterpretersByCriteria($criteria)
    {
        $sql = "SELECT * FROM users INNER JOIN interpreters ON users.id = interpreters.userId";
        $args = [];

        if($criteria['certification'] != '')
        {
            $sql .= " WHERE (certification = ?) AND";
            array_push($args, $criteria['certification']);
        }

        if($criteria['gender'] != '')
        {
            $sql .= "  (gender = ?) AND";
            array_push($args, $criteria['gender']);
        }

        if($criteria['state'] != '')
        {
            $sql .= "  (state = ?)";
            array_push($args, $criteria['state']);
        }

        //$sql = "SELECT users.firstName, users.lastName FROM users INNER JOIN interpreters ON users.id = interpreters.userId WHERE users.userType = 'interpreter'";
        var_dump($sql);
        var_dump($args);

        $searchResults = Database::getSQLQueryResult($sql, $args)->fetch(PDO::FETCH_ASSOC);




    }

}