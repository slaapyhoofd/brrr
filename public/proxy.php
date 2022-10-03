<?php
// Convert post data to json (array)
$_POST = json_decode(file_get_contents('php://input') , true);

// Extract data from json (array)
$url = $_POST["url"];
$apiKey = $_POST["xApiKey"];
$data = $_POST["data"];

$httpHeader = array(
  'Content-Type: application/json',
  'X-Api-Key: ' . $apiKey
);

// Create a new cURL resource
$ch = curl_init($url);

if (isset($data))
{
  // Attach encoded JSON string to the POST fields
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
}
else
{
  // Set request type to GET
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
}

// Set the content type to application/json
curl_setopt($ch, CURLOPT_HTTPHEADER, $httpHeader);

// Return response instead of outputting
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the POST request
$result = curl_exec($ch);

// Close cURL resource
curl_close($ch);

header('Content-Type: application/json');
echo $result;
?>
