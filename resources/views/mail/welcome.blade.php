<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .content {
            padding: 20px;
            background-color: #f4f4f4;
        }
    </style>
</head>

<body>
    <div class="content">
        <h1>Hello, {{ $data->name }}!</h1>
        <p>Welcome to our Website</p>
        <p style="color: blue;">Your mail : {{ $data->email }}, created at {{ $data->created_at }}</p>
    </div>
</body>

</html>
