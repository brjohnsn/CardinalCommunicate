<?php

namespace cc\models;

class Password{

    public static function hash($unencryptedPassword, $encryptionSalt=null){
        if(!$encryptionSalt){
            $encryptionSalt = self::generateEncryptionSalt(32);
        }
        return hash('sha256', $unencryptedPassword . $encryptionSalt);
    }

    public static function generateEncryptionSalt($saltLength){
        return random_bytes($saltLength);
    }

}