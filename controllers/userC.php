<?php
use cc\models\User;
use cc\models\Client;
use cc\models\Event;
use cc\models\Interpreter;

class userC
{
    public static function Login($request, $response)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $body = $request->getParsedBody();
        $SignInStatus = User::getValidUser($body['username'], $body['password']);
        $_SESSION['username'] = $SignInStatus['username'];
        $SignInStatus = array_map('utf8_encode', $SignInStatus);
        $jsonSignInStatus = json_encode($SignInStatus);

        return $jsonSignInStatus;
    }

    public static function Register($request, $response)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $body = $request->getParsedBody();
        User::addNewUser($body);
    }

    public static function getInfo($request, $response)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $body = $request->getParsedBody();
        $userAttributes = User::getUserAttributesByUsername($body['username']);
        unset($userAttributes['salt']);
        $userAttributes['userEvents']=Client::getClientEventDataByClientUsername($body['username']);
        $jsonUserAttributes = json_encode($userAttributes);
        return $jsonUserAttributes;
    }

    public static function getInterpreterMappingData($request, $response)
    {
        $interpreterMappingData = \cc\models\Interpreter::getAllInterpreterMappingData();
        $jsonInterpreterMappingData = json_encode($interpreterMappingData);
        return $jsonInterpreterMappingData;
    }

    public static function searchForInterpreter($request, $response)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $body = $request->getParsedBody();
        $searchCriteria=['certification' => $body['certification'],
                         'gender' => $body['gender'],
                         'state' => $body['state'],
                         'username' => $body['username'],
        ];
        $searchResults = Client::findInterpretersByCriteria($searchCriteria);
        $jsonSearchResults = json_encode($searchResults);
        return $jsonSearchResults;
    }

    public static function addEvent($request, $response)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $body = $request->getParsedBody();
        $eventCreationStatus = Event::addNewEvent($body)->errorCode();
        $jsonEventCreationStatus = json_encode($eventCreationStatus);
        return $jsonEventCreationStatus;
    }

    public static function requestInterpreter($request, $response)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $body = $request->getParsedBody();
        $eventUpdateStatus = Client::requestInterpreterForEvent($body);
        $jsonEventUpdateStatus = json_encode($eventUpdateStatus);
        return $jsonEventUpdateStatus;
    }

    public static function declineRequest($request, $response)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $body = $request->getParsedBody();
        $eventUpdateStatus = Interpreter::declineInterpreterRequest($body);
        $jsonEventUpdateStatus = json_encode($eventUpdateStatus);
        return $jsonEventUpdateStatus;
    }

    public static function acceptRequest($request, $response)
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $body = $request->getParsedBody();
        $eventUpdateStatus = Interpreter::acceptInterpreterRequest($body);
        $jsonEventUpdateStatus = json_encode($eventUpdateStatus);
        return $jsonEventUpdateStatus;
    }
}
?>