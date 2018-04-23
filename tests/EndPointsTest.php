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
        $response = $http->request('POST', 'user/login', array('form_params' => array('username'=>'InitialClient', 'password'=>'InitialPassword')));
        $responseArray = json_decode($response->getBody());
        $this->assertEquals('InitialClient', $responseArray->username);
    }

    public function testEndpoint_UserProfile()
    {
        $http = new GuzzleHttp\Client(['base_uri' => 'localhost:8888/CardinalCC/public/']);
        $response = $http->request('POST', 'user/Profile', array('form_params' => array('username'=>'InitialClient')));
        $responseArray = json_decode($response->getBody());
        $this->assertEquals('1', $responseArray->id);
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
        $eventCreationStatus = json_decode($response->getBody());
        $this->assertEquals("00000", $eventCreationStatus);
    }

    public function testEndPoint_requestInterpreter()
    {
        ;
    }

    //TODO Write endpoint test for /Interpreters
    //getInterpreterMappingData
}