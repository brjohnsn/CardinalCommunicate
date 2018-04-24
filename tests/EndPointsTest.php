<?php
/**
 * Created by PhpStorm.
 * User: Chris
 * Date: 4/16/2018
 * Time: 8:08 PM
 */

namespace Tests;

//use EndPointsTest;
use PHPUnit\Framework\TestCase;
use GuzzleHttp;

class EndPointsTest extends TestCase
{
    use GuzzleHttp\Psr7\MessageTrait;
    public function testEndpoint_UserRegister()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/Register', array('form_params' => array('username'=>'TestCaseUser', 'password'=>'InitialPassword', 'firstName'=>'Endpoint', 'lastName'=>'Added', 'address1'=>'123 Main Street', 'address2'=>'Suite 98', 'city'=>'Whoville', 'state'=>'GR', 'zip'=>'99999', 'userType'=>'Client', 'gender'=>'male',)));
        $this->assertEquals('', $response->getBody());
    }

    public function testEndpoint_UserLogin()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/login', array('form_params' => array('username'=>'aholliday', 'password'=>'InitialPassword')));
        $responseArray = json_decode($response->getBody());
        $this->assertEquals('aholliday', $responseArray->username);
    }

    public function testEndpoint_UserProfile()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/Profile', array('form_params' => array('username'=>'cmoua')));
        $responseArray = json_decode($response->getBody());
        $this->assertEquals('5', $responseArray->id);
    }

    public function testEndpoint_addEvent()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/add-event', array('form_params'=>array(
                                                                                                    'eventName' => 'Event4',
                                                                                                    'eventDescription' => 'TestDescription',
                                                                                                    'eventVenueName'=> 'Test',
                                                                                                    'eventAddress1' => 'TestTEst',
                                                                                                    'eventCity' => 'eventCity',
                                                                                                    'eventState' => 'TS',
                                                                                                    'eventZip' => '44444',
                                                                                                    'eventDate' => '07/31/2018',
                                                                                                    'eventStartTime' => '3:30 PM',
                                                                                                    'eventEndTime' => '5:00 PM',
                                                                                                    'eventStatus' => 'Approved',
                                                                                                    'eventClientId' => '1',
                                                                                                    'eventInterpreterId' => '1',
        )));
        $eventCreationErrorCode = json_decode($response->getBody());
        $this->assertEquals("00000", $eventCreationErrorCode);
    }

    public function testEndPoint_requestInterpreter()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/request-interpreter', array('form_params'=>array(
                                                                                                                'interpreterUsername' => 'InitialInterpreter',
                                                                                                                'eventId' => '1',
            )));
        $eventCreationErrorCode = json_decode($response->getBody());
        $this->assertEquals("00000", $eventCreationErrorCode);
    }

    public function testEndPoint_declineRequest()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/decline-request', array('form_params'=>array(
                                                                                                                'eventId' => '1',
            )));
        $eventCreationErrorCode = json_decode($response->getBody());
        $this->assertEquals("00000", $eventCreationErrorCode);
    }

    public function testEndPoint_acceptRequest()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/accept-request', array('form_params'=>array(
                                                                                                                'eventId' => '1',
            )));
        $eventCreationErrorCode = json_decode($response->getBody());
        $this->assertEquals("00000", $eventCreationErrorCode);
    }

    public function testEndPoint_getAllInterpreterMappingData()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/Interpreters', array());

        $interpreterMappingData = json_decode($response->getBody());
        $this->assertEquals(5, sizeof($interpreterMappingData));
    }

    public function testEndPoint_searchForInterpreterByUsername()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/Search', array('form_params'=>array('username'=>'ewhite',
                                                                                              'state' => '',
                                                                                              'gender' => '',
                                                                                              'certification' => '')));

        $searchResults = json_decode($response->getBody());
        $this->assertEquals(1, sizeof($searchResults));
    }
}