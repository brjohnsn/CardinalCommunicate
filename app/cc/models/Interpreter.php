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
        $userAttributes = User::getUserAttributesByUsername($interpreterAttributes['username']);

        $sql = "INSERT INTO interpreters (userId, telephone, zip, certification) VALUES (?,?,?,?)";
        $values = [$userAttributes['id'],
            $interpreterAttributes['telephone'],
            $interpreterAttributes['zip'],
            $interpreterAttributes['certification']];

        $result = Database::getSQLQueryResult($sql, $values);

        return $result;
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
        $sql = "SELECT * FROM users WHERE userType = 'interpreter'";
        $interpreterAddresses = Database::getSQLQueryResult($sql)->fetchAll(PDO::FETCH_ASSOC);

        $allInterpreterMappingData=[];
        foreach($interpreterAddresses as $interpreterAddress)
        {
            $addressString = User::createAddressStringFromAddressAttributes($interpreterAddress);
            $currentInterpreterMappingData=['username' => $interpreterAddress['username'],
                   'address' => $addressString,
                   'address2' => $interpreterAddress['address2'],
                   'userId' => $interpreterAddress['id']];

            array_push($allInterpreterMappingData,$currentInterpreterMappingData);
        }
        return $allInterpreterMappingData;
    }
}