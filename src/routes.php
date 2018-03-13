<?php
ini_set("display_errors",1);
error_reporting(E_ALL);
use Slim\Http\Request;
use Slim\Http\Response;


require_once __DIR__ ."/../controllers/userC.php";



$app->group('/user', function() use ($app){
   $app->post('/login', 'userC::Login');
   $app->post('/Register', 'userC::Register');
   $app->get('/Profile', 'userC::getInfo');
});