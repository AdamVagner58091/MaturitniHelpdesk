<?php
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Read the messages from the text file and return as response
    $messages = file_get_contents("messages.txt");
    echo $messages !== false ? $messages : "Error retrieving messages";
} else {
    http_response_code(405);
    echo "Method not allowed";
}
?>
