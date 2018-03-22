<?php namespace cc\models;

use cc\models\Database as Database;
use cc\models\Password;

//require "../../../utilities/Database.php";

class User
{

    private $username;
    private $email;
    private $password;
    private $salt;

    public function __construct($userAttributes)
    {
        foreach ($userAttributes as $attributeName => $attributeValue){
            ;
        }
    }


}