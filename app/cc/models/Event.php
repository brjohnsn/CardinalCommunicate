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

}