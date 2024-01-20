<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
require_once('../Models/Empleados.Model.php');
$Empleados = new Clase_Empleados();
switch ($_GET["op"]) {
    case 'todos':
        $datos = array();
        $datos = $Empleados->todos();
        while ($fila = mysqli_fetch_assoc($datos)) {
            $todos[] = $fila;
        }
        echo json_encode($todos);
        break;
    case "uno":
        $ID_empleado = $_POST["ID_empleado"];
        $datos = array();
        $datos = $Empleados->uno($ID_empleado);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;
    case "insertar":
        $Nombre = $_POST["Nombre"];
        $Cargo = $_POST["Cargo"];
        $Salario = $_POST["Salario"];
        $Fecha_contratacion = $_POST["Fecha_contratacion"];
        $datos = array();
        $datos = $Empleados->insertar($Nombre, $Cargo, $Salario, $Fecha_contratacion);
        echo json_encode($datos);
        break;
    case "actualizar":
        $ID_empleado = $_POST["ID_empleado"];
        $Nombre = $_POST["Nombre"];
        $Cargo = $_POST["Cargo"];
        $Salario = $_POST["Salario"];
        $Fecha_contratacion = $_POST["Fecha_contratacion"];
        $datos = array();
        $datos = $Empleados->actualizar($ID_empleado, $Nombre, $Cargo, $Salario, $Fecha_contratacion);
        echo json_encode($datos);
        break;
    case "eliminar":
        $ID_empleado = $_POST["ID_empleado"];
        $datos = array();
        $datos = $Empleados->eliminar($ID_empleado);
        echo json_encode($datos);
        break;
}
