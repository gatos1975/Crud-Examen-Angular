<?php
require_once('../Config/cls_conexion.model.php');
class Clase_Empleados
{
    public function todos()
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM Empleados";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            echo $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function uno($ID_empleado)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM Empleados WHERE ID_empleado = $ID_empleado";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function insertar($Nombre, $Cargo, $Salario, $Fecha_contratacion)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO `Empleados`(`Nombre`, `Cargo`, `Salario`,`Fecha_contratacion`) VALUES ('$Nombre','$Cargo','$Salario','$Fecha_contratacion')";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($ID_empleado, $Nombre, $Cargo, $Salario, $Fecha_contratacion)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE Empleados SET Nombre = '$Nombre', Cargo = '$Cargo', Salario = '$Salario', Fecha_contratacion = '$Fecha_contratacion' WHERE ID_empleado = $ID_empleado";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($ID_empleado)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "DELETE FROM Empleados WHERE ID_empleado = $ID_empleado";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
