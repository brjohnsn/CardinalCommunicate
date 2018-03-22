<?php
use PHPUnit\Framework\TestCase;
use PHPUnit\DbUnit\TestCaseTrait;

use cc\models\User;
use cc\models\Database;
use cc\models\Password;

class UnitTests extends TestCase
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
        return $this->createFlatXMLDataSet('dbUnitAssertions/testDataSet.xml');
    }

    //Begin project unit tests
    public function testPHPUnitIsRunningWithTrivialAssertion(){
        $this->assertSame(2, 1 + 1);
    }

    public function testAddUserToDatabase(){
        $userAttributes = ['username' => 'testUsername1',
                           'password' => 'testPassword1',
                           'email' => 'testEmail1',
                           'type' => 'client',
                           'salt' => 'NULL',
                          ];

        $testUser = new User($userAttributes);
        $testUser->addToDatabase();
        $expectedResultTable = $this->createFlatXMLDataSet('dbUnitAssertions/testAddUserToDatabase.xml')->getTable('users');
        $queryTable = $this->getConnection()->createQueryTable('users', 'SELECT * FROM users');

        $this->assertTablesEqual($expectedResultTable,$queryTable);



    }
}