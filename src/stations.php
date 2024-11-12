<?php
include 'db.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the response header to JSON format
header('Content-Type: application/json');

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Read request data for POST and PUT
$data = json_decode(file_get_contents("php://input"), true);

// Handle the request based on the HTTP method
switch ($method) {
    case 'GET':
        // Check if a specific station ID is requested
        if (isset($_GET['id'])) {
            $station_id = $_GET['id'];
            $sql = "SELECT * FROM bus_stations WHERE station_id = $station_id";
            $result = $conn->query($sql);
            echo json_encode($result->fetch_assoc());
        } else {
            // Fetch all bus stations
            $sql = "SELECT * FROM bus_stations";
            $result = $conn->query($sql);
            $stations = [];
            while ($row = $result->fetch_assoc()) {
                $stations[] = $row;
            }
            echo json_encode($stations);
        }
        break;

    case 'POST':
        // Create a new bus station
        $station_name = $data['station_name'];
        $location = $data['location'];
        $sql = "INSERT INTO bus_stations (station_name, location) VALUES ('$station_name', '$location')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Station created successfully']);
        } else {
            echo json_encode(['error' => 'Error: ' . $conn->error]);
        }
        break;

    case 'PUT':
        // Update an existing bus station
        $station_id = $data['station_id'];
        $station_name = $data['station_name'];
        $location = $data['location'];
        $sql = "UPDATE bus_stations SET station_name='$station_name', location='$location' WHERE station_id=$station_id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Station updated successfully']);
        } else {
            echo json_encode(['error' => 'Error: ' . $conn->error]);
        }
        break;

    case 'DELETE':
        // Delete a bus station
        if (isset($_GET['id'])) {
            $station_id = $_GET['id'];
            $sql = "DELETE FROM bus_stations WHERE station_id=$station_id";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['message' => 'Station deleted successfully']);
            } else {
                echo json_encode(['error' => 'Error: ' . $conn->error]);
            }
        } else {
            echo json_encode(['error' => 'No station ID provided']);
        }
        break;

    default:
        echo json_encode(['error' => 'Invalid request method']);
        break;
}

$conn->close();
?>
