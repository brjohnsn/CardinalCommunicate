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
}
