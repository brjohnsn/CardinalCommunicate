<?php
use cc\models\User;
use cc\models\Database;

class userC
{
    public static function Login($request, $response)
    {
        $body = $request->getParsedBody();
        $SignInStatus = User::getValidUser($body['username'], $body['password']);
        $_SESSION['username'] = $SignInStatus['username'];
        $SignInStatus = array_map('utf8_encode', $SignInStatus);
        $jsonSignInStatus = json_encode($SignInStatus);

        return $jsonSignInStatus;




        return $response->withJson($jsonSignInStatus);
    }

    public static function Register($request, $response)
    {
        $body = $request->getParsedBody();
        Database::addNewUser($body);
    }


    public static function getInfo($request, $response)
    {
        $body = $request->getParsedBody();
        $userAttributes = Database::getUserAttributesByUsername($body['username']);
        $userAttributes = array_map('utf8_encode', $userAttributes);
        $jsonUserAttributes = json_encode($userAttributes);
        return $jsonUserAttributes;
    }
}
?>