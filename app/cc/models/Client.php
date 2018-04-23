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
        $sql = "SELECT * FROM users INNER JOIN interpreters ON users.id = interpreters.userId WHERE (certification LIKE ?) AND (gender LIKE ?) AND (state LIKE ?)";
        $args = [];

        if($criteria['certification'] != "")
        {
            //$sql .= " WHERE (certification = ?) AND";
            array_push($args, $criteria['certification']);
        }
        else
        {
            array_push($args, "%");
        }

        if($criteria['gender'] != "")
        {
            //$sql .= "";
            array_push($args, $criteria['gender']);
        }
        else
        {
            array_push($args, "%");
        }

        if($criteria['state'] != "")
        {
            //$sql .= "  (state = ?)";
            array_push($args, $criteria['state']);
        }
        else
        {
            array_push($args, "%");
        }

        $searchResults = Database::getSQLQueryResult($sql, $args)->fetchAll();
        return $searchResults;
    }

    public static function requestInterpreterForEvent($requestInformation)
    {
        $eventId = $requestInformation['eventId'];
        $interpreterUsername = $requestInformation['interpreterUsername'];

        $sql = "SELECT id FROM users WHERE username = ?";
        $args=[$interpreterUsername];
        $result = Database::getSQLQueryResult($sql, $args)->fetch(PDO::FETCH_ASSOC);
        $interpreterId = $result['id'];

        $sql = "UPDATE events SET eventInterpreterId = ?, eventStatus = ? WHERE eventId LIKE ?";
        $args = [$interpreterId, "Pending", $eventId];

        $eventUpdateStatus = Database::getSQLQueryResult($sql, $args)->errorCode();

        return $eventUpdateStatus;
    }
    


}