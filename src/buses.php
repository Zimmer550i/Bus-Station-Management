<?php
include 'db.php';  // Include the database connection

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $bus_id = $_GET['id'];
            $sql = "SELECT * FROM buses WHERE bus_id = $bus_id";
            $result = $conn->query($sql);
            echo json_encode($result->fetch_assoc());
        } else {
            $sql = "SELECT * FROM buses";
            $result = $conn->query($sql);
            $buses = [];
            while ($row = $result->fetch_assoc()) {
                $buses[] = $row;
            }
            echo json_encode($buses);
        }
        break;

    case 'POST':
        $bus_number = $data['bus_number'];
        $capacity = $data['capacity'];
        $route_id = $data['route_id'];
        $sql = "INSERT INTO buses (bus_number, capacity, route_id) VALUES ('$bus_number', $capacity, $route_id)";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Bus created successfully']);
        } else {
            echo json_encode(['error' => 'Error: ' . $conn->error]);
        }
        break;

    case 'PUT':
        $bus_id = $data['bus_id'];
        $bus_number = $data['bus_number'];
        $capacity = $data['capacity'];
        $route_id = $data['route_id'];
        $sql = "UPDATE buses SET bus_number='$bus_number', capacity=$capacity, route_id=$route_id WHERE bus_id=$bus_id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Bus updated successfully']);
        } else {
            echo json_encode(['error' => 'Error: ' . $conn->error]);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $bus_id = $_GET['id'];
            $sql = "DELETE FROM buses WHERE bus_id=$bus_id";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['message' => 'Bus deleted successfully']);
            } else {
                echo json_encode(['error' => 'Error: ' . $conn->error]);
            }
        } else {
            echo json_encode(['error' => 'No bus ID provided']);
        }
        break;

    default:
        echo json_encode(['error' => 'Invalid request method']);
        break;

}

$conn->close();
?>
