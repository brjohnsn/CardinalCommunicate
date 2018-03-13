<?php
use PHPUnit\Framework\TestCase;
use PHPUnit\DbUnit\TestCaseTrait;

use cc\models\User;
use cc\models\Database;
use cc\models\Password;

class UnitTests extends TestCase
{

    use TestCaseTrait;

    //Ensure PHPUnit is running
    public function testCalculate(){
        $this->assertSame(2, 1 + 1);
    }

    //Initialize DBUnit connection
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
        return $this->createFlatXMLDataSet('dbUnitAssertions/testDataSet.xml');
    }

    /*For demonstration only.
    Can be deleted once we are more comfortable with PDO connection and
    PHPUnit testing.*/
    public function testGetAllRecords()
    {
        $database = Database::getDatabaseConnection();
        $stmt = $database->getQueryResult('SELECT * FROM users');
        $this->assertEquals(1, $stmt->rowCount());
    }

    //Begin project unit tests
    public function testAddUserToDatabase(){
    $newUserAttributes = array('username' => 'User2',
                                'email' => 'Email2',
                                'password' => 'Password2',
                                'salt' => '12345678901234567890123456789012',
        );
    $userToAdd = new User($newUserAttributes);
    $userToAdd->addToDatabase();

    $dbUnitQueryTable = $this->getConnection()->createQueryTable('users', 'SELECT * FROM users');
    $dbUnitExpectedTable = $this->createFlatXMLDataSet('dbUnitAssertions/testAddUserToDatabase.xml')->getTable('users');

    $this->assertTablesEqual($dbUnitExpectedTable, $dbUnitQueryTable);
    }

    public function testConnectToDatabase()
    {
        $database = Database::getDatabaseConnection();
        $this->assertEquals($database, $database);
    }

    public function testGenerate32CharacterEncryptionSalt(){
        $generatedEncryptionSalt = Password::generateEncryptionSalt(32);
        $this->assertEquals(32, strlen($generatedEncryptionSalt));
    }

    public function testHashPasswordWithSHA256(){
        $testSalt = 12345678901234567890123456789012;
        $unencryptedPassword = 'password';
        $hashedPassword = Password::hash($unencryptedPassword, $testSalt);

        $this->assertEquals('5522d29c3cf8d11cb0c68b4dc3282f54f783414e5e50f41ff4d7fe38951a474e', $hashedPassword);
    }

    public function testSignIn(){
        $username = 'Test1';
        $password = 'Password2';

        $userAttributes = array('username' => $username,
                                'password' => $password,
                                );

        $user = new User($userAttributes);
        $user->signIn();

        $this->assertEquals($_SESSION['id'], 100);
    }
}














