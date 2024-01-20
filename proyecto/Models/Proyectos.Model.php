<?php
require_once('../Config/cls_conexion.model.php');
class Clase_Proyecto
{
    public function todos()
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT Proyectos.ID_proyecto, 
        Proyectos.Nombre_proyecto AS Nombre, 
        Empleados.Nombre AS ID_empleado, 
        Proyectos.Fecha_inicio, 
        Proyectos.Fecha_fin
 FROM Proyectos
 INNER JOIN Empleados ON Proyectos.ID_empleado = Empleados.ID_empleado;";

            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function uno($ID_proyecto)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM `proyectos` WHERE `ID_proyecto` = $ID_proyecto";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function insertar($ID_empleado, $Nombre, $Fecha_inicio, $Fecha_fin)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO `proyectos`(`ID_empleado`, `Nombre`, `Fecha_inicio`, `Fecha_fin`) VALUES ($ID_empleado,'$Nombre','$Fecha_inicio','$Fecha_fin')";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($ID_proyecto, $ID_empleado, $Nombre, $Fecha_inicio, $Fecha_fin)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE `proyectos` SET `ID_empleado`= $ID_empleado,`Nombre`='$Nombre', `Fecha_inicio`='$Fecha_inicio', `Fecha_fin`='$Fecha_fin' WHERE `ID_proyecto`=$ID_proyecto";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($ID_proyecto)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "DELETE FROM `proyectos` WHERE `ID_proyecto`=$ID_proyecto";
            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
