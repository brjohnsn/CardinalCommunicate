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
                                    eventDescription,
                                    eventVenueName, 
                                    eventAddress1,
                                    eventCity,
                                    eventState,
                                    eventZip, 
                                    eventStartUnixTimestamp,
                                    eventEndUnixTimestamp,
                                    eventStatus, 
                                    eventClientId,
                                    eventInterpreterId
                                    ) 
                                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        $values = [
            $eventAttributes['eventName'],
            $eventAttributes['eventDescription'],
            $eventAttributes['eventVenueName'],
            $eventAttributes['eventAddress1'],
            $eventAttributes['eventCity'],
            $eventAttributes['eventState'],
            $eventAttributes['eventZip'],
            $eventAttributes['eventStartUnixTimestamp'],
            $eventAttributes['eventEndUnixTimestamp'],
            $eventAttributes['eventStatus'],
            $eventAttributes['eventClientId'],
            $eventAttributes['eventInterpreterId'],






        ];
        $result = Database::getSQLQueryResult($sql, $values);
        return $result;
    }

}