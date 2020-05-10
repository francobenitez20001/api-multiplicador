<?php
    class Conexion 
    {
        static function conectar(){
            $opciones = array(PDO::MYQSL_ATTR_INIT_COMMAND => 'SET NAME utf8');
            $link = new PDO(
                'mysql:host=us-cdbr-east-06.cleardb.net;dbname=heroku_5a392985476cd37',
                'b32460f90c6ff5',
                'ca902cc6',
                $link
            );
            $link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
            return $link;
        }
    }
    
?>