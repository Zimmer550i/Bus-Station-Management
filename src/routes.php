<?php
include 'db.php';  // Include the database connection

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $route_id = $_GET['id'];
            $sql = "SELECT * FROM routes WHERE route_id = $route_id";
            $result = $conn->query($sql);
            echo json_encode($result->fetch_assoc());
        } else {
            $sql = "SELECT * FROM routes";
            $result = $conn->query($sql);
            $routes = [];
            while ($row = $result->fetch_assoc()) {
                $routes[] = $row;
            }
            echo json_encode($routes);
        }
        break;

    case 'POST':
        $route_name = $data['route_name'];
        $start_station_id = $data['start_station_id'];
        $end_station_id = $data['end_station_id'];
        $sql = "INSERT INTO routes (route_name, start_station_id, end_station_id) VALUES ('$route_name', $start_station_id, $end_station_id)";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Route created successfully']);
        } else {
            echo json_encode(['error' => 'Error: ' . $conn->error]);
        }
        break;

    case 'PUT':
        $route_id = $data['route_id'];
        $route_name = $data['route_name'];
        $start_station_id = $data['start_station_id'];
        $end_station_id = $data['end_station_id'];
        $sql = "UPDATE routes SET route_name='$route_name', start_station_id=$start_station_id, end_station_id=$end_station_id WHERE route_id=$route_id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Route updated successfully']);
        } else {
            echo json_encode(['error' => 'Error: ' . $conn->error]);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $route_id = $_GET['id'];
            $sql = "DELETE FROM routes WHERE route_id=$route_id";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['message' => 'Route deleted successfully']);
            } else {
                echo json_encode(['error' => 'Error: ' . $conn->error]);
            }
        } else {
            echo json_encode(['error' => 'No route ID provided']);
        }
        break;

    default:
        echo json_encode(['error' => 'Invalid request method']);
        break;
}

$conn->close();
?>
