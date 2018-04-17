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
        $userEvents = Client::getClientEventDataByClientUsername($body['username']);

        foreach ($userEvents as $userEvent)
        {$userEvent = array_map('utf8_encode', $userEvent);
        }

        $userEvents = json_encode($userEvents);

        $userAttributes = array_map('utf8_encode', $userAttributes);
        $jsonUserAttributes = json_encode($userAttributes);

        $jsonUserAttributes = json_encode(array_merge(json_decode($jsonUserAttributes, true), json_decode($userEvents, true)));

        return $jsonUserAttributes;
    }
}
?>