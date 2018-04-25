<?php
session_start();
use PHPUnit\Framework\TestCase;
use PHPUnit\DbUnit\TestCaseTrait;
use cc\models\Password;
use cc\models\User;
use cc\models\Client;
use cc\models\Interpreter;
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

    public function testAddInterpreterToDatabase()
    {
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

    public function testHashPassword()
    {
        $testSalt = '01234567890123456789012345678901';
        $hashedPassword = Password::hashPassword('testPassword1', $testSalt);
        $this->assertEquals('393afd25693c67e0c079038c31b2b4b00d2d7855fb5a88fe842b5239acb5dbe2', $hashedPassword);
    }

    public function testCheckUserCredentialsAreAuthentic()
    {
        $username = 'rpainter';
        $password = 'InitialPassword';
        $authenticatedUser = User::getValidUser($username, $password);

        $this->assertNotEquals(false, $authenticatedUser);
    }

    public function testSignInUser()
    {
        $userAttributes = [
            'username' => 'rpainter',
            'password' => 'InitialPassword',
            'salt' => '01234567890123456789012345678901',
            'userType' => 'client',
            'id' => '1',
        ];

        $testUser = new User($userAttributes);

        $testUser->signIn();

        $this->assertEquals('1', $_SESSION['id']);
    }


    public function testGetInterpreterAttributesById()
    {
        $id = '2';
        $interpreterAttributes = \cc\models\Interpreter::getInterpreterAttributesByUserId($id);

        //$this->assertEquals("ebentley", $interpreterAttributes['username']);
        $this->assertEquals("1", $interpreterAttributes['interpreterId']);
        $this->assertEquals("909-405-3531", $interpreterAttributes['telephone']);
        $this->assertEquals("95103", $interpreterAttributes['zip']);
        $this->assertEquals("CDI", $interpreterAttributes['certification']);


    }

    public function testGetUserAttributesByUsername()
    {
        $username = 'ismith';

        $userAttributes = User::getUserAttributesByUsername($username);

        $this->assertEquals('8', $userAttributes['id']);
        $this->assertEquals('Ivana', $userAttributes['firstName']);
        $this->assertEquals('Smith', $userAttributes['lastName']);
        $this->assertEquals('1355 Clark Street', $userAttributes['address1']);
        $this->assertEquals('', $userAttributes['address2']);
        $this->assertEquals('New York', $userAttributes['city']);
        $this->assertEquals('NY', $userAttributes['state']);
        $this->assertEquals('11756', $userAttributes['zip']);
        $this->assertEquals('interpreter', $userAttributes['userType']);
        $this->assertEquals('female', $userAttributes['gender']);

    }

    public function testGetUniversalUserAttributesByUsername()
    {   $username = "ismith";
        $universalUserAttributes = User::getUniversalUserAttributesByUsername($username);

        $this->assertEquals('8', $universalUserAttributes['id']);
        $this->assertEquals('Ivana', $universalUserAttributes['firstName']);
        $this->assertEquals('Smith', $universalUserAttributes['lastName']);
        $this->assertEquals('1355 Clark Street', $universalUserAttributes['address1']);
        $this->assertEquals('', $universalUserAttributes['address2']);
        $this->assertEquals('New York', $universalUserAttributes['city']);
        $this->assertEquals('NY', $universalUserAttributes['state']);
        $this->assertEquals('11756', $universalUserAttributes['zip']);
        $this->assertEquals('interpreter', $universalUserAttributes['userType']);
        $this->assertEquals('female', $universalUserAttributes['gender']);

    }

    public function testGetClientEventsByClientUsername()
    {
        $clientEvents = Client::getClientEventDataByClientUsername('aholliday');

        $this->assertEquals(4, sizeof($clientEvents));
        $this->assertEquals('1', $clientEvents[0]['eventId']);

        //var_dump($clientEvents);
    }

    public function testGetAllInterpreterAddressInformation()
    {
        $interpreterAddresses = \cc\models\Interpreter::getAllInterpreterMappingData();

        $this->assertEquals(5, sizeOf($interpreterAddresses));
        $this->assertEquals('ebentley', $interpreterAddresses[0]['username']);
    }


    public function testAddEventToDatabase()
    {
        $eventAttributes = [
            'eventName' => 'Test Event',
            'eventDescription' => 'Test Description',
            'eventVenueName'=> 'Test Venue',
            'eventAddress1' => 'Test Address1',
            'eventAddress2' => "",
            'eventCity' => 'Test City',
            'eventState' => 'TS',
            'eventZip' => '00000',
            'eventDate' => '07/31/2018',
            'eventStartTime' => '3:30 PM',
            'eventEndTime' => '5:00 PM',
            'eventStatus' => 'None',
            'eventClientId' => '1',
            'eventInterpreterId' => '',
    ];

        \cc\models\Event::addNewEvent($eventAttributes);


        $expectedResultTable = $this->createFlatXMLDataSet(__DIR__ .'/dbUnitAssertions/testAddEventToDatabase.xml')->getTable('events');
        $actualResultTable = $this->getConnection()->createQueryTable('events', 'SELECT * FROM events');
        $this->assertTablesEqual($expectedResultTable,$actualResultTable);

    }

    public function testGetUserIdByUsername()
    {
        $userId = Client::getUserIdByUsername("sdressler");
        $this->assertEquals('4', $userId);
    }


    public function testFindInterpretersByCriteria()
    {
        $criteria=['certification' => 'CDI',
                 'gender' => 'male',
                 'state' => 'CA',
                 'username' => 'ebentley',
                 ];

        $actualSearchResults = Client::findInterpretersByCriteria($criteria);


        $this->assertEquals($actualSearchResults[0]['username'], "ebentley");
    }

    public function testCreateAddressStringFromAddressAttributes()
    {
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
    {
        $requestInformation = ['eventId' => '6',
                               'interpreterUsername' => 'ewhite',
            ];
        Client::requestInterpreterForEvent($requestInformation);

        $sql = "SELECT * FROM events WHERE eventId=6";
        $result = Database::getSQLQueryResult($sql)->fetch(PDO::FETCH_ASSOC);

        $this->assertEquals("Pending", $result['eventStatus']);
        $this->assertEquals("10", $result['eventInterpreterId']);
    }

    public function testDeclineInterpreterRequest()
    {
        $requestAttributes = ['eventId' => '1'];
        Interpreter::declineInterpreterRequest($requestAttributes);

        $sql = "SELECT * FROM events WHERE eventId=1";
        $result = Database::getSQLQueryResult($sql)->fetch(PDO::FETCH_ASSOC);

        $this->assertEquals("Declined", $result['eventStatus']);
        $this->assertEquals("0", $result['eventInterpreterId']);
    }

    public function testAcceptInterpreterRequest()
    {
        $requestAttributes = ['eventId' => '6'];

        Interpreter::acceptInterpreterRequest($requestAttributes);

        $sql = "SELECT * FROM events WHERE eventId=6";
        $result = Database::getSQLQueryResult($sql)->fetch(PDO::FETCH_ASSOC);

        $this->assertEquals("Accepted", $result['eventStatus']);
    }

    public function testGetInterpreterIdbyUsername()
    {
        $interpreterId = Interpreter::getInterpreterIdByUsername('ewhite');
        $this->assertEquals('10', $interpreterId);
    }
}
