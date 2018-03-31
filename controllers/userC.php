<?php
use cc\models\User;
use cc\models\Database;

class userC
{
    public static function Login($request, $response)
    {
        $body = $request->getParsedBody();
        echo('output');
        echo ($body['username']);
        die();
        //$user = new User($body);
        $SignInStatus = User::getValidUser($username, $password);
        return $response->withJson($SignInStatus);
    }

    public static function Register($request, $response)
    {
        $body = $request->getParsedBody();
        Database::addNewUser($body);
    }


    public static function getInfo($request, $response)
    {
        $LogedIn= $_SESSION['loggedIn'];
        return $response->withJson($LogedIn);
    }
}
?>