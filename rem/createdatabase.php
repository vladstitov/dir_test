<?php

$files=array('users.sql','categories.sql','destinations.sql');
$sqls = array();
foreach($files as $file) $sqls[] = file_get_contents('../data/start/'.$file);
$db = new PDO('sqlite:../data/start/directories.db');
//foreach($sqls as $sql)$db->query($sql);

$db = new PDO('sqlite:../data/start/statistics.db');

$sqls =  explode(';',file_get_contents('../data/start/statistics.sql'));
foreach($sqls as $sql)$db->query($sql);




