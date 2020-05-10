<?php
    require_once 'classes/Conexion.php';
    $conexion = Conexion::conectar();
    echo $conexion;
?>
