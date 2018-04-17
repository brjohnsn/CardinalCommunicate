<?php
session_start();
use PHPUnit\Framework\TestCase;
use PHPUnit\DbUnit\TestCaseTrait;
use cc\models\Password;
use cc\models\User;

use cc\models\Database;

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
            'username' => 'testUsername1',
            'password' => 'testPassword1',
            'salt' => '01234567890123456789012345678901',
            'userType' => 'client',
            'gender' => 'male'
                          ];

        Database::addNewUser($userAttributes);

        $expectedResultTable = $this->createFlatXMLDataSet(__DIR__ . '/dbUnitAssertions/testAddUserToDatabase.xml')->getTable('users');
        $actualResultTable = $this->getConnection()->createQueryTable('users', 'SELECT * FROM users');
        $this->assertTablesEqual($expectedResultTable,$actualResultTable);
    }

    public function testAddInterpreterToDatabase(){
        $userAttributes = [
            'username' => 'testInterpreter1',
            'password' => 'testPassword1',
            'salt' => '01234567890123456789012345678901',
            'userType' => 'interpreter',
            'gender' => 'male',
            'telephone' => '7654321',
            'zip' => '54321',
            'certification' => 'CDI',
        ];

        Database::addNewUser($userAttributes);

        $expectedResultTable = $this->createFlatXMLDataSet(__DIR__ . '/dbUnitAssertions/testAddInterpreterToDatabase.xml')->getTable('interpreters');
        $actualResultTable = $this->getConnection()->createQueryTable('interpreters', 'SELECT * FROM interpreters');
        $this->assertTablesEqual($expectedResultTable,$actualResultTable);
    }

    public function testHashPassword(){
        $testSalt = '01234567890123456789012345678901';
        $hashedPassword = Password::hashPassword('testPassword1', $testSalt);
        $this->assertEquals('393afd25693c67e0c079038c31b2b4b00d2d7855fb5a88fe842b5239acb5dbe2', $hashedPassword);
    }

    public function testCheckUserCredentialsAreAuthentic()
    {
        $username = 'InitialClient';
        $password = 'InitialPassword';
        $authenticatedUser = User::getValidUser($username, $password);

        $this->assertNotEquals(false, $authenticatedUser);
    }

    public function testSignInUser()
    {
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
    {
        $id = '2';
        $interpreterAttributes = Database::getInterpreterAttributesByUserId($id);

        $this->assertEquals('1234567', $interpreterAttributes['telephone']);

    }

    public function testGetUserAttributesByUsername()
    {
        $username = 'InitialInterpreter';

        $userAttributes = Database::getUserAttributesByUsername($username);

        $this->assertEquals('1234567', $userAttributes['telephone']);
        $this->assertEquals('female', $userAttributes['gender']);
    }

    public function testGetUniversalUserAttributesByUsername()
    {
        $username = "InitialInterpreter";
        $universalUserAttributes = Database::getUniversalUserAttributesByUsername($username);

        $this->assertEquals('2', $universalUserAttributes['id']);

    }

    public function testGetClientEventsByClientUsername()
    {
        $clientEvents = Database::getClientEventDataByClientUsername('InitialClient');

        $this->assertEquals(2, sizeof($clientEvents));
        $this->assertEquals('1', $clientEvents[0]['eventId']);

        //var_dump($clientEvents);
    }


//    public function testAddEventToDatabase()
//    {
//        echo mktime(13,0,0,7,2,2018);
//        // hour -13, min - 0, sec-0, month -7, day -2, year - 2018
//        //echo date('M j Y g:i A', strtotime('2010-05-29 01:17:35'));
//        echo date('JUL 2 2018 1:17 PM', strtotime('2018-07-02 01:17:00'));
//        $eventAttributes = [
//            'eventName' => 'testEvent1',
//            'eventZipCode' => '55555',
//            'eventStartUnixTimestamp' => date('JUL 2 2018 1:17 PM', strtotime('2018-07-02 01:17:00')),
//            'eventEndUnixTimestamp' => date('JUL 2 2018 2:17 PM', strtotime('2018-07-02 02:17:00 ')),
//            'eventClientId' => '1',
//            'eventInterpreterId' => '1',
//
//    ];
//
//        Database::addNewEvent($eventAttributes);
//
//        $expectedResultTable = $this->createFlatXMLDataSet('dbUnitAssertions/testAddEventToDatabase.xml')->getTable('events');
//        $actualResultTable = $this->getConnection()->createQueryTable('events', 'SELECT * FROM events');
//        $this->assertTablesEqual($expectedResultTable,$actualResultTable);
//
//    }

}
