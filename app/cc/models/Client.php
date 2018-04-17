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