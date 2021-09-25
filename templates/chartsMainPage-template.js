'use strict'

const chartAppMainPage=
`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backend HighCharts Angular App</title>
    <link rel="icon" type="image/x-icon" href="https://raw.githubusercontent.com/UlisesVil/HighChartsAngularApp/main/src/assets/icons/graphIcon01.jpg">
    <style>
        body{
            display:flex;
            justify-content:center;
            align-items:center;
            background: url(https://blogs.imf.org/wp-content/uploads/2017/08/BLOG-1024x600-image-of-charts-TOP5Charts-iStock-615507200.jpg);
            background-attachment: fixed;
            background-position: center;
            background-size: cover;
            color: white;
        }
        .content{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            width:90%;
            border: 3px solid purple;
            border-radius: 10px;
            padding-bottom: 20px;
            margin: auto;
            text-align: center;
            text-shadow: 3px 3px 5px black;
            background: rgba(0,0,0,.8);
        }
        img{
            width:20%;
            min-width:200px;
            margin-top:30px;
        }
        a{
            text-decoration:none;
            color: yellowgreen;
        }
        a:hover{
            color: purple;
        }
    </style>
</head>
<body>
    <div class="content">
            <h1 style='color: white;'>Welcome!! This is the API Rest from The Charts Angular APP</h1>
            <h2>You can visit the repo here: <a href="https://github.com/UlisesVil/HighCartsNodeJSBackend" target="_blank">GitHub Repo</a></h2>
            <h2>And the App here: <a href="https://ulisesvil.github.io/HighChartsAngularApp" target="_blank">Charts Angular APP</a></h2>
            <img src="https://raw.githubusercontent.com/UlisesVil/HighChartsAngularApp/main/src/assets/icons/piesample.jpg">
        </div>
    </body>
</html>`;

module.exports = chartAppMainPage;