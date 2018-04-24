<?php
/**
 * Created by PhpStorm.
 * User: Chris
 * Date: 4/16/2018
 * Time: 8:42 PM
 */

namespace cc\models;
use PDO;


class Interpreter
{
    public static function addNewInterpreter($interpreterAttributes)
    {
        $newInterpreterUserAttributes = User::getUserAttributesByUsername($interpreterAttributes['username']);

        $sql = "INSERT INTO interpreters (userId, telephone, zip, certification) VALUES (?,?,?,?)";
        $values = [$newInterpreterUserAttributes['id'],
            $interpreterAttributes['telephone'],
            $interpreterAttributes['zip'],
            $interpreterAttributes['certification']];

        $querySuccessStatus = Database::getSQLQueryResult($sql, $values);

        return $querySuccessStatus;
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

    public static function getAllInterpreterMappingData(){
        //TODO break the search for all interpreter user attributes into a separate method?

        $sql = "SELECT * FROM users WHERE userType = 'interpreter'";
        $allInterpreterUserAttributes = Database::getSQLQueryResult($sql)->fetchAll(PDO::FETCH_ASSOC);

        $allInterpreterMappingData=[];
        foreach($allInterpreterUserAttributes as $interpreterAttributes)
        {
            $currentInterpreterMappingData=['username' => $interpreterAttributes['username'],
                   'address' => User::createAddressStringFromAddressAttributes($interpreterAttributes),
                   'address2' => $interpreterAttributes['address2'],
                   'userId' => $interpreterAttributes['id']];

            array_push($allInterpreterMappingData,$currentInterpreterMappingData);
        }
        return $allInterpreterMappingData;
    }

    public static function declineInterpreterRequest($requestAttributes)
    {
        $sql = "UPDATE events SET eventStatus = ?, eventInterpreterId = ? WHERE eventId LIKE ?";
        $args = ["Declined", '', $requestAttributes['eventId']];

        $result = Database::getSQLQueryResult($sql, $args)->errorCode();
        return $result;
    }

    public static function acceptInterpreterRequest($requestAttributes)
    {
        $sql = "UPDATE events SET eventStatus = ?  WHERE eventId LIKE ?";
        $args = ["Accepted", $requestAttributes['eventId']];

        $result = Database::getSQLQueryResult($sql, $args)->errorCode();
        return $result;
    }
}