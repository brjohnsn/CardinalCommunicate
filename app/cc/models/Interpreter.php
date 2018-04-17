<?php
/**
 * Created by PhpStorm.
 * User: Chris
 * Date: 4/16/2018
 * Time: 8:42 PM
 */

namespace cc\models;


class Interpreter
{
    public static function addNewInterpreter($interpreterAttributes)
    {
        $userAttributes = Database::getUserAttributesByUsername($interpreterAttributes['username']);

        $sql = "INSERT INTO interpreters (userId, telephone, zip, certification) VALUES (?,?,?,?)";
        $values = [$userAttributes['id'],
            $interpreterAttributes['telephone'],
            $interpreterAttributes['zip'],
            $interpreterAttributes['certification']];



        $result = Database::getSQLQueryResult($sql, $values);

        return $result;
    }
}