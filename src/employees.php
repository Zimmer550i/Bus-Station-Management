<?php
include 'db.php';  // Include the database connection

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $employee_id = $_GET['id'];
            $sql = "SELECT * FROM employees WHERE employee_id = $employee_id";
            $result = $conn->query($sql);
            echo json_encode($result->fetch_assoc());
        } else {
            $sql = "SELECT * FROM employees";
            $result = $conn->query($sql);
            $employees = [];
            while ($row = $result->fetch_assoc()) {
                $employees[] = $row;
            }
            echo json_encode($employees);
        }
        break;

    case 'POST':
        $employee_name = $data['employee_name'];
        $role = $data['role'];
        $station_id = $data['station_id'];
        $sql = "INSERT INTO employees (employee_name, role, station_id) VALUES ('$employee_name', '$role', $station_id)";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Employee created successfully']);
        } else {
            echo json_encode(['error' => 'Error: ' . $conn->error]);
        }
        break;

    case 'PUT':
        $employee_id = $data['employee_id'];
        $employee_name = $data['employee_name'];
        $role = $data['role'];
        $station_id = $data['station_id'];
        $sql = "UPDATE employees SET employee_name='$employee_name', role='$role', station_id=$station_id WHERE employee_id=$employee_id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Employee updated successfully']);
        } else {
            echo json_encode(['error' => 'Error: ' . $conn->error]);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $employee_id = $_GET['id'];
            $sql = "DELETE FROM employees WHERE employee_id=$employee_id";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['message' => 'Employee deleted successfully']);
            } else {
                echo json_encode(['error' => 'Error: ' . $conn->error]);
            }
        } else {
            echo json_encode(['error' => 'No employee ID provided']);
        }
        break;

    default:
        echo json_encode(['error' => 'Invalid request method']);
        break;
}

$conn->close();
?>
