<?php
use cc\models\User;
use cc\models\Database;
use cc\models\Client;

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
        User::addNewUser($body);
    }


    public static function getInfo($request, $response)
    {
        $body = $request->getParsedBody();
        $userAttributes = User::getUserAttributesByUsername($body['username']);

        $userAttributes['userEvents']=Client::getClientEventDataByClientUsername($body['username']);
        $jsonUserAttributes = json_encode($userAttributes);
        return $jsonUserAttributes;
    }
}
?>