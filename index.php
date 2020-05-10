<?php
    $conexion = mysqli_connect('us-cdbr-east-06.cleardb.net','b32460f90c6ff5','ca902cc6','heroku_5a392985476cd37')or die(mysqli_error());
    if ($conexion) {
        echo 'conectado';
    }else{
        echo 'no';
    }
?>
