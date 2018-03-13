<?php
use cc\models\User;

class userC{
    public static function Login($request, $response){
      $user = new User($request);
      $SignInStatus = $user->signIn();
      return $response->withJson($SignInStatus);
    }

    public static function Register($request, $response){
        $user = new User($request);
        $user->addToDatabase();
    }
}

?>