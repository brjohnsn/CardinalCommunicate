<?php
/**
 * Created by PhpStorm.
 * User: Chris
 * Date: 4/16/2018
 * Time: 9:03 PM
 */

namespace cc\models;


class Event
{
    public static function addNewEvent($eventAttributes)
    {
        $sql = "INSERT INTO events (eventName, 
                                    eventZip, 
                                    eventStartUnixTimestamp, 
                                    eventClientId,
                                    eventInterpreterId,
                                    eventAddress1,
                                    eventStatus,
                                    eventState,
                                    eventEndUnixTimeStamp,
                                    eventVenueName,
                                    eventDescription,
                                    eventCity
                                    ) 
                                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        $values = [
            $eventAttributes['eventName'],
            $eventAttributes['eventZip'],
            $eventAttributes['eventStartUnixTimestamp'],
            $eventAttributes['eventEndUnixTimestamp'],
            $eventAttributes['eventClientId'],
            $eventAttributes['eventInterpreterId'],
            $eventAttributes['eventAddress1'],
            $eventAttributes['eventStatus'],
            $eventAttributes['eventState'],
            $eventAttributes['eventCity'],
            $eventAttributes['eventVenueName'],
            $eventAttributes['eventDescription']
        ];
        $result = Database::getSQLQueryResult($sql, $values);
        return $result;
    }

}