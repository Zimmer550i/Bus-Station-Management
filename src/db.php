<?php
$servername = "db";
$username = "admin";
$password = "admin";
$dbname = "cse311l_project"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
