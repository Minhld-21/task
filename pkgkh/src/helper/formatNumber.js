import React, { Component, useState } from "react";

export default function formatNumber  (num) {
    return Number.parseFloat(num,1) == Number.parseInt(num)? num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') :num.toFixed(1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};