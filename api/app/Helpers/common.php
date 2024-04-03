<?php


function isAdmin()
{
    if(auth()->user()->role == "admin") {
        return true;
    }

    return false;
}

function isAgent()
{
    if(auth()->user()->role == "agent") {
        return true;
    }

    return false;
}