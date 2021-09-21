'use strict'

const chartAppMainPage=
`<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Charts-App</title>
        <link rel="icon" type="image/x-icon" href="">
        <style>
            body{
                background:#181818;
                color: white;
                display:flex;
                justify-content:center;
                align-items:center;
            }
            .content{
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                width:90%;
                margin: auto;
                text-align: center;
            }
            img{
                width:40%;
                min-width:200px;
                margin-top:30px;
            }
            a{
                text-decoration:none;
                color: yellowgreen;
            }
        </style>
    </head>
    <body>
        <div class="content">
            <h1 style='color: white;'>Welcome!! This is the API Rest from The Charts Angular APP</h1>
            <h2>You can visit the site here: <a href="https://ulisesvil.github.io" target="_blank">Charts Angular APP</a></h2>
            <img src="https://images-cdn.newscred.com/Zz04NjA3ZjljMjQ0ODkxMWViOWRjYzU1OGJkNjI1ZjVkZA==">
        </div>
    </body>
</html>`;

module.exports = chartAppMainPage;