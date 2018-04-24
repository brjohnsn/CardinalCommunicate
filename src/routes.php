<?php
//TODO: Remove error reporting before releasing to production.
ini_set("display_errors",1);
error_reporting(E_ALL);

use /** @noinspection PhpUnusedAliasInspection */ //Required for Slim framework.
    Slim\Http\Request;

use /** @noinspection PhpUnusedAliasInspection */ //Required for Slim framework.
    Slim\Http\Response;

require_once __DIR__ ."/../controllers/userC.php";

$app->group('/user', function() use ($app){
   $app->post('/login', 'userC::Login');
   $app->post('/Register', 'userC::Register');
   $app->post('/Profile', 'userC::getInfo');
   $app->post('/Interpreters', 'userC::getInterpreterMappingData');
   $app->post('/Search', 'userC::searchForInterpreter');
   $app->post('/add-event', 'userC::addEvent');
   $app->post('/request-interpreter', 'userC::requestInterpreter');
   $app->post('/decline-request', 'userC::declineRequest');
   $app->post('/accept-request', 'userC::acceptRequest');
});