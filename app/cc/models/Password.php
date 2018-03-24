<?php

namespace cc\models;

class Password{

    public static function hashPassword($unencryptedPassword, $encryptionSalt=null){
        return hash('sha256', $unencryptedPassword . $encryptionSalt);
    }

    public static function generateEncryptionSalt(){
        try
        {
            $salt = random_bytes(32);
        }
        catch (\Exception $e) {
            die();
        }

        return $salt;
    }

}