<?php
use PHPUnit\Framework\TestCase;
require('../utilities/Database.php');

class UnitTests extends TestCase
{
    public function testCalculate()
    {
        $this->assertSame(2, 1 + 1);
    }

    /*For demonstration only.
    Can be deleted once we are more comfortable with PDO connection and
    PHPUnit testing.*/
    public function testGetSingleRecord()
    {
        $db = Database::connect();
        $stmt = $db->run('SELECT * FROM users');
        $this->assertEquals(1, $stmt->rowCount());
    }
}

