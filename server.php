<?php
    session_start();
    $q = $_REQUEST["q"];
    $i = $_REQUEST["i"];
    $_SESSION["q"] = $q;
    $_SESSION["i"] = $i;
    $invalid = "#";

    if ($q !== ""){
        if ($i !== ""){
            $q = htmlspecialchars($q)
            $i = htmlspecialchars($i)
            echo $q
        } else {
            echo $invalid;
        };
    } else {
        echo $invalid;
    };
?>