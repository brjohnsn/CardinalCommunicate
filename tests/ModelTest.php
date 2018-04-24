<?php
session_start();
use PHPUnit\Framework\TestCase;
use PHPUnit\DbUnit\TestCaseTrait;
use cc\models\Password;
use cc\models\User;
use cc\models\Client;
use cc\models\Interpreter;


class ModelTest extends TestCase
{
    use TestCaseTrait;

    //Initialize database connection
    protected function getConnection(){
        $databaseConnectionOptions = array();
        $databaseHost = 'localhost';
        $databaseName = 'cardinal_communicate';
        $databaseUser = 'root';
        $databasePassword = 'root';
        $databaseCharSet = 'utf8mb4';
        $dataSourceName = "mysql:host=$databaseHost;dbname=$databaseName;charset=$databaseCharSet";

        $phpDatabaseObject = new PDO($dataSourceName, $databaseUser, $databasePassword, $databaseConnectionOptions);

        return $this->createDefaultDBConnection($phpDatabaseObject, $databaseName);
    }

    //Initialize DBUnit dataset
    protected function getDataSet(){
        return $this->createFlatXMLDataSet(__DIR__ . '/dbUnitAssertions/testDataSet.xml');
    }


    //Begin project unit tests
    public function testPHPUnitIsRunningWithTrivialAssertion(){
        $this->assertSame(2, 1 + 1);
    }

    public function testAddUserToDatabase(){
        $userAttributes = [
            'username' => 'testAddedUser',
            'password' => 'InitialPassword',
            'salt' => '01234567890123456789012345678901',
            'firstName' => 'Test',
            'lastName' => 'Added',
            'address1' => 'TestAddress1',
            'address2' => 'TestAddress2',
            'city' => 'TestCity',
            'state' => 'TS',
            'zip' => '00000',
            'userType' => 'client',
            'gender' => 'male'
                          ];

        User::addNewUser($userAttributes);

        $expectedResultTable = $this->createFlatXMLDataSet(__DIR__ . '/dbUnitAssertions/testAddUserToDatabase.xml')->getTable('users');
        $actualResultTable = $this->getConnection()->createQueryTable('users', 'SELECT * FROM users');
        $this->assertTablesEqual($expectedResultTable,$actualResultTable);
    }

    public function testAddInterpreterToDatabase(){
        $userAttributes = [
            'username' => 'testAddedUser',
            'password' => 'InitialPassword',
            'salt' => '01234567890123456789012345678901',
            'firstName' => 'Test',
            'lastName' => 'Added',
            'address1' => 'TestAddress1',
            'address2' => 'TestAddress2',
            'city' => 'TestCity',
            'state' => 'TS',
            'zip' => '00000',
            'userType' => 'interpreter',
            'gender' => 'male',
            'telephone' => '0000000000',
            'certification' => 'CDI',
        ];

        User::addNewUser($userAttributes);

        $expectedResultTable = $this->createFlatXMLDataSet(__DIR__ . '/dbUnitAssertions/testAddInterpreterToDatabase.xml')->getTable('interpreters');
        $actualResultTable = $this->getConnection()->createQueryTable('interpreters', 'SELECT * FROM interpreters');
        $this->assertTablesEqual($expectedResultTable,$actualResultTable);
    }

    public function testHashPassword(){
        $this->markTestSkipped('must be revisited.');
        $testSalt = '01234567890123456789012345678901';
        $hashedPassword = Password::hashPassword('testPassword1', $testSalt);
        $this->assertEquals('393afd25693c67e0c079038c31b2b4b00d2d7855fb5a88fe842b5239acb5dbe2', $hashedPassword);
    }

    public function testCheckUserCredentialsAreAuthentic()
    {$this->markTestSkipped('must be revisited.');
        $username = 'InitialClient';
        $password = 'InitialPassword';
        $authenticatedUser = User::getValidUser($username, $password);

        $this->assertNotEquals(false, $authenticatedUser);
    }

    public function testSignInUser()
    {$this->markTestSkipped('must be revisited.');
        $userAttributes = [
            'username' => 'testUsername1',
            'password' => 'testPassword1',
            'salt' => '01234567890123456789012345678901',
            'userType' => 'client',
            'id' => '1',
        ];

        $testUser = new User($userAttributes);

        $testUser->signIn();

        $this->assertEquals('1', $_SESSION['id']);
        session_destroy();
    }


    public function testGetInterpreterAttributesById()
    {$this->markTestSkipped('must be revisited.');
        $id = '2';
        $interpreterAttributes = \cc\models\Interpreter::getInterpreterAttributesByUserId($id);

        $this->assertEquals('1234567', $interpreterAttributes['telephone']);

    }

    public function testGetUserAttributesByUsername()
    {$this->markTestSkipped('must be revisited.');
        $username = 'InitialInterpreter';

        $userAttributes = User::getUserAttributesByUsername($username);

        $this->assertEquals('1234567', $userAttributes['telephone']);
        $this->assertEquals('female', $userAttributes['gender']);
    }

    public function testGetUniversalUserAttributesByUsername()
    {$this->markTestSkipped('must be revisited.');
        $username = "InitialInterpreter";
        $universalUserAttributes = User::getUniversalUserAttributesByUsername($username);

        $this->assertEquals('2', $universalUserAttributes['id']);

    }

    public function testGetClientEventsByClientUsername()
    {$this->markTestSkipped('must be revisited.');
        $clientEvents = Client::getClientEventDataByClientUsername('InitialClient');

        $this->assertEquals(3, sizeof($clientEvents));
        $this->assertEquals('1', $clientEvents[0]['eventId']);

        //var_dump($clientEvents);
    }

    public function testGetAllInterpreterAddressInformation()
    {$this->markTestSkipped('must be revisited.');

        $interpreterAddresses = \cc\models\Interpreter::getAllInterpreterMappingData();


        $this->assertEquals(1, sizeOf($interpreterAddresses));
        $this->assertEquals('InitialInterpreter', $interpreterAddresses[0]['username']);

    }


    public function testAddEventToDatabase()
    {$this->markTestSkipped('must be revisited.');
        //echo mktime(13,0,0,7,2,2018);
        // hour -13, min - 0, sec-0, month -7, day -2, year - 2018
        //echo date('M j Y g:i A', strtotime('2010-05-29 01:17:35'));
        //echo date('JUL 2 2018 1:17 PM', strtotime('2018-07-02 01:17:00'));
        $eventAttributes = [
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
    ];

        \cc\models\Event::addNewEvent($eventAttributes);


        $expectedResultTable = $this->createFlatXMLDataSet(__DIR__ .'/dbUnitAssertions/testAddEventToDatabase.xml')->getTable('events');
        $actualResultTable = $this->getConnection()->createQueryTable('events', 'SELECT * FROM events');
        $this->assertTablesEqual($expectedResultTable,$actualResultTable);

    }

    public function testGetUserIdByUsername()
    {$this->markTestSkipped('must be revisited.');
        $userId = Client::getUserIdByUsername("InitialClient");
        $this->assertEquals('1', $userId);
    }


    public function testFindInterpretersByCriteria()
    {$this->markTestSkipped('must be revisited.');
        $criteria=['certification' => 'CDI',
                 'gender' => 'female',
                 'state' => 'IA',
                 ];

        $actualSearchResults = Client::findInterpretersByCriteria($criteria);

        $this->assertEquals($actualSearchResults[0]['username'], "InitialInterpreter");
    }

    public function testCreateAddressStringFromAddressAttributes()
    {$this->markTestSkipped('must be revisited.');
        $addressAttributes=[
            "address1" => "address1",
            "city" => "city",
            "state" => "state",
            "zip" => "zip",
        ];

        $actualAddressString = User::createAddressStringFromAddressAttributes($addressAttributes);
        $expectedAddressString ="address1,city,state,zip";
        $this->assertEquals($expectedAddressString, $actualAddressString);
    }

    public function testRequestInterpreterForEvent()
    {$this->markTestSkipped('must be revisited.');
        $requestInformation = ['eventId' => '1',
                               'interpreterUsername' => 'InitialInterpreter',
            ];

        $eventUpdateStatus = Client::requestInterpreterForEvent($requestInformation);

        $this->assertEquals('00000', $eventUpdateStatus);

    }

    public function testDeclineInterpreterRequest()
    {$this->markTestSkipped('must be revisited.');
        $requestAttributes = ['eventId' => '1'];

        $eventUpdateStatus = Interpreter::declineInterpreterRequest($requestAttributes);

        $this->assertEquals('00000', $eventUpdateStatus);
    }

    public function testAcceptInterpreterRequest()
    {
        $requestAttributes = ['eventId' => '1'];

        $eventUpdateStatus = Interpreter::acceptInterpreterRequest($requestAttributes);

        $this->assertEquals('00000', $eventUpdateStatus);
    }
}
